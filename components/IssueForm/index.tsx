'use client';

import 'easymde/dist/easymde.min.css';

import { zodResolver } from '@hookform/resolvers/zod';
import type { Issue } from '@prisma/client';
import { CloudUploadIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { CldUploadWidget } from 'next-cloudinary';
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
import { createIssueSchema } from '@/lib/validators';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

export type IssueFormType = z.infer<typeof createIssueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const { mutate: createNewIssue, isPending } = useCreateIssue();
  const { mutate: updateIssue, isPending: isUpdating } = useUpdateIssue();

  console.log(issue);

  const navigation = useRouter();
  const form = useForm<IssueFormType>({
    resolver: zodResolver(createIssueSchema),
    defaultValues: issue
      ? { ...issue }
      : { priority: 'LOW', label: 'BUG', assets: [] },
  });

  const onSubmit = (data: IssueFormType) => {
    const onSuccess = () => {
      navigation.replace('/dashboard/issue/list');
    };

    if (issue?.id) {
      updateIssue({ id: issue.id, data }, { onSuccess });
    } else {
      createNewIssue(data, { onSuccess });
    }
  };

  console.log('form error', form.formState.errors);

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
          <CldUploadWidget
            uploadPreset="ml_default"
            options={{
              folder: 'fixit-assets',
              sources: ['camera', 'local', 'url', 'google_drive'],
              maxFiles: 4,
              defaultSource: 'local',
              clientAllowedFormats: ['image', 'video'],
            }}
            signatureEndpoint="/api/sign-cloudinary-assets"
            onSuccess={({ info }) => {
              if (!info || typeof info === 'string') return;
              const prevValues = form.getValues('assets');
              form.setValue('assets', [
                ...prevValues,
                { type: info.resource_type, url: info.url },
              ]);
            }}
          >
            {({ open }) => (
              <Button
                type="button"
                onClick={() => open()}
                className="gap-2"
                variant="outline"
              >
                <CloudUploadIcon className="size-4 text-primary" />
                Upload Assets
              </Button>
            )}
          </CldUploadWidget>
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
            <Button type="submit" disabled={isPending}>
              {isUpdating ? 'Updating...' : 'Update'}
            </Button>
          ) : (
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Submitting...' : 'Submit'}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default IssueForm;
