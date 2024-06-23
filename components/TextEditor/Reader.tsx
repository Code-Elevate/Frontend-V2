"use client";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Editor } from "@/components/plate-ui/editor";
import { Plate } from "@udecode/plate-common";

import { plugins } from "./plugins";

export function TextReader({ value }: { value: any }) {
  return (
    <DndProvider backend={HTML5Backend}>
      <Plate plugins={plugins} initialValue={value} readOnly>
        <Editor
          focusRing={false}
          className="border-none bg-transparent pb-4 p-0 m-0"
          readOnly
        />
      </Plate>
    </DndProvider>
  );
}
