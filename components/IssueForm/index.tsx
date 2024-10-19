'use client';

import 'easymde/dist/easymde.min.css';

import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
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
import { createNewIssue } from '@/lib/actions/issue';
import { LABELS, PRIORITIES } from '@/lib/constants';
import { createIssueSchema } from '@/lib/validators';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

export type IssueFormType = z.infer<typeof createIssueSchema>;

const IssueForm = () => {
  const { data: session } = useSession();

  const navigation = useRouter();
  const form = useForm<IssueFormType>({
    resolver: zodResolver(createIssueSchema),
    defaultValues: {
      priority: 'LOW',
      label: 'BUG',
      assets: [],
      createdBy: session?.user?.id,
    },
  });

  const onSubmit = async (data: IssueFormType) => {
    toast.promise(
      createNewIssue(data).then(() =>
        navigation.replace('/dashboard/issue/list', { scroll: false }),
      ),
      {
        error: 'Error while creating new issue',
        loading: 'Submitting',
        success: 'Created',
      },
    );
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
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default IssueForm;
