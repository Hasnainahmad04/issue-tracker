'use client';

import 'easymde/dist/easymde.min.css';

import { zodResolver } from '@hookform/resolvers/zod';
import type { Issue } from '@prisma/client';
import { nanoid } from 'nanoid';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useCreateIssue from '@/hooks/issue/useCreateIssue';
import useUpdateIssue from '@/hooks/issue/useUpdateIssue';
import { LABELS, PRIORITIES } from '@/lib/constants';
import { supabase } from '@/lib/supabse';
import { createIssueSchema } from '@/lib/validators';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

export type IssueFormType = z.infer<typeof createIssueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const { mutateAsync: createNewIssue } = useCreateIssue();
  const { mutateAsync: updateIssue } = useUpdateIssue();
  const [files, setFiles] = useState<FileList | null>(null);

  const navigation = useRouter();
  const form = useForm<IssueFormType>({
    resolver: zodResolver(createIssueSchema),
    defaultValues: issue
      ? { ...issue }
      : { priority: 'LOW', label: 'BUG', assets: [] },
  });

  const onSubmit = async (data: IssueFormType) => {
    const onSuccess = () => {
      navigation.replace('/dashboard/issue/list');
    };

    const assets = await Promise.all(
      Array.from(files || []).map(async (file) => {
        const id = nanoid();
        const [type, fileType] = file.type.split('/');

        const { data: result } = await supabase.storage
          .from('images')
          .upload(`${id}.${fileType}`, file);

        if (!result) return null;

        const { data: url } = supabase.storage
          .from('images')
          .getPublicUrl(result.path);

        return { type: type!, url: url.publicUrl };
      }),
    );

    if (issue?.id) {
      await updateIssue({ id: issue.id, data }, { onSuccess });
    } else {
      await createNewIssue(
        { ...data, assets: assets.filter((asset) => asset !== null) },
        { onSuccess },
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl className="prose">
                <SimpleMDE {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!issue && (
          <FormItem>
            <FormLabel>Asset</FormLabel>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setFiles(e.target.files)}
              multiple
            />
          </FormItem>
        )}

        <div className="flex w-full space-x-3">
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Tag</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Please Select a Tag" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {LABELS.map((label) => (
                      <SelectItem value={label} key={label}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Priority</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Please Select a Tag" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {PRIORITIES.map((priority) => (
                      <SelectItem value={priority} key={priority}>
                        {priority}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full justify-end">
          {issue?.id ? (
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Updating...' : 'Update'}
            </Button>
          ) : (
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default IssueForm;
