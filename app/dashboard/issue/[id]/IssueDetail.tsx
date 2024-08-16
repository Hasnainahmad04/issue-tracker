'use client';

import { SquarePenIcon, TrashIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

import DeleteDialog from '@/components/DeleteDialog';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import useDeleteIssue from '@/hooks/issue/useDeleteIssue';
import { formatDate } from '@/lib/utils';
import type { Issue } from '@/types';

type Props = {
  issue: Issue;
};

const IssueDetail = ({ issue }: Props) => {
  const [open, setOpen] = useState(false);
  const { mutate: deleteIssue, isPending } = useDeleteIssue();
  // const videos = issue.assets.filter((asset) => asset.type === 'video');
  const images = issue.assets.filter((asset) => asset.type === 'image');
  const router = useRouter();

  return (
    <div className="prose mx-auto">
      <div className="mb-8 flex w-full justify-between">
        <div>
          <h1>{issue.title}</h1>
          <span className="text-sm text-gray-500">
            {formatDate(issue.createdAt.toString())}
          </span>
        </div>
        <div className="flex">
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={`/dashboard/issue/edit/${issue.id}`}
                  className={buttonVariants({ size: 'icon', variant: 'ghost' })}
                >
                  <SquarePenIcon className="size-4 text-gray-500" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="top">Edit Issue</TooltipContent>
            </Tooltip>
            <DeleteDialog
              title={
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setOpen(true)}
                    >
                      <TrashIcon className="size-4 text-red-600" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Delete Issue</TooltipContent>
                </Tooltip>
              }
              onOpenChange={setOpen}
              open={open}
              issue={issue}
              loading={isPending}
              onDelete={() => {
                deleteIssue(issue.id, {
                  onSuccess: () => {
                    setOpen(false);
                    router.replace('/dashboard/issue/list');
                  },
                });
              }}
            />
          </TooltipProvider>
        </div>
      </div>
      <div className="flex">
        {images.map((asset) => {
          return (
            <div
              className="block size-36 overflow-hidden rounded-md border"
              // href={asset.url}
              key={asset.id}
              // target="_blank"
              // rel="noopener noreferrer"
            >
              <Image
                src={asset.url}
                width={200}
                height={200}
                className="size-36 object-contain"
                alt={`Attachment for ${asset.issueId}`}
              />
            </div>
          );
        })}
      </div>

      <ReactMarkdown>{issue.description}</ReactMarkdown>
    </div>
  );
};

export default IssueDetail;
