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
import { cn, formatDate } from '@/lib/utils';
import type { Issue } from '@/types';

type Props = {
  issue: Issue;
};

const IssueDetail = ({ issue }: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const { mutate: deleteIssue, isPending } = useDeleteIssue();
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
      {issue.assets.length && (
        <a
          href={issue.assets[selectedImage]?.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={issue.assets[selectedImage]?.url || ''}
            width={500}
            height={500}
            className="aspect-video rounded-md border"
            alt={`Attachment for ${issue.assets[selectedImage]?.issueId}`}
          />
        </a>
      )}
      <div className="flex gap-4 overflow-x-auto">
        {issue.assets.map((asset, index) => {
          return (
            <Image
              src={asset.url}
              key={asset.id}
              width={500}
              height={500}
              className={cn(
                `h-24 w-36 cursor-pointer rounded-md border object-cover transition ease-linear hover:scale-105 ${selectedImage === index ? 'brightness-50' : 'brightness-100'}`,
              )}
              alt={`Attachment for ${asset.issueId}`}
              onClick={() => setSelectedImage(index)}
            />
          );
        })}
      </div>

      <ReactMarkdown>{issue.description}</ReactMarkdown>
    </div>
  );
};

export default IssueDetail;
