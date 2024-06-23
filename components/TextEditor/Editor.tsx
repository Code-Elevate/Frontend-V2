"use client";

import { useRef, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { CommentsPopover } from "@/components/plate-ui/comments-popover";
import { CursorOverlay } from "@/components/plate-ui/cursor-overlay";
import { Editor } from "@/components/plate-ui/editor";
import { FixedToolbar } from "@/components/plate-ui/fixed-toolbar";
import { FixedToolbarButtons } from "@/components/plate-ui/fixed-toolbar-buttons";
import { FloatingToolbar } from "@/components/plate-ui/floating-toolbar";
import { FloatingToolbarButtons } from "@/components/plate-ui/floating-toolbar-buttons";
import { TooltipProvider } from "@/components/plate-ui/tooltip";
import { cn } from "@/utils/cn";
import { CommentsProvider } from "@udecode/plate-comments";
import { Plate } from "@udecode/plate-common";

import { plugins } from "./plugins";

export function TextEditor({
  id,
  name,
  placeholder,
  value,
  onChange,
}: {
  id?: string;
  name?: string;
  placeholder?: string;
  value?: any;
  onChange?: any;
}) {
  const containerRef = useRef(null);
  const [placeholderValue, setPlaceholderValue] = useState(placeholder);

  return (
    <TooltipProvider
      disableHoverableContent
      delayDuration={500}
      skipDelayDuration={0}
    >
      <DndProvider backend={HTML5Backend}>
        <CommentsProvider>
          <Plate plugins={plugins} id={id} value={value} onChange={onChange}>
            <div
              ref={containerRef}
              className={cn(
                "relative",
                "[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4"
              )}
            >
              <FixedToolbar>
                <FixedToolbarButtons />
              </FixedToolbar>

              <Editor
                focusRing={false}
                className="border-none py-4 pb-8"
                id={id}
                name={name}
                placeholder={placeholderValue}
                onClick={() => setPlaceholderValue("")}
                onBlur={() => setPlaceholderValue(placeholder)}
              />

              <FloatingToolbar>
                <FloatingToolbarButtons />
              </FloatingToolbar>
              <CommentsPopover />
              <CursorOverlay containerRef={containerRef} />
            </div>
          </Plate>
        </CommentsProvider>
      </DndProvider>
    </TooltipProvider>
  );
}
