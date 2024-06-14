"use client";

import { navTitles } from "@/app/routes";
import Heading from "@/components/Heading";
import MainPage from "@/components/MainPageHOC";
import { TextEditor } from "@/components/TextEditor/Editor";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const NewContest = () => {
  const [elements, setElements] = useState();

  const handleSubmit = () => {
    const stringified = JSON.stringify(elements, (key, value) =>
      key === "id" ? undefined : value
    );
    console.log(stringified);
  };

  return (
    <MainPage activeNav={navTitles.Contests}>
      <Heading>Create New Contest</Heading>
      <div className="border rounded">
        <TextEditor setValue={setElements} />
      </div>
      <Button onClick={handleSubmit}>Submit</Button>
    </MainPage>
  );
};

export default NewContest;
