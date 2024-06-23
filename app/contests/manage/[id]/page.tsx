"use client";

import React, { useState, useEffect } from "react";

import { Routes, navTitles } from "@/app/routes";
import Footer from "@/components/Footer";
import Heading from "@/components/Heading";
import LabelInputContainer from "@/components/LabelInputContainer";
import MainPage from "@/components/MainPageHOC";
import { Input } from "@/components/plate-ui/input";
import { TextEditor } from "@/components/TextEditor/Editor";
import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@/components/ui/datetime-picker/picker";
import { Label } from "@/components/ui/Label";
import MultipleSelector from "@/components/ui/multiple-selector";
import { Switch } from "@/components/ui/switch";
import { searchUsers } from "@/utils/services/search";
import {
  NewContestData,
  getContestById,
  updateContest,
} from "@/utils/services/manageContests";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";
import { ImSpinner8 } from "react-icons/im";

type Props = {
  params: {
    id: string;
  };
};

const EditContest = ({ params }: Props) => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [contestData, setContestData] = useState({
    id: params.id,
    title: "",
    description: "",
    longDescription: undefined as string | undefined,
    startTime: "",
    endTime: "",
    maxTeamSize: 2,
    organizers: [] as string[],
    penalty: {
      isOn: false,
      value: 0,
    },
  });

  useEffect(() => {
    const fetchContest = async () => {
      const contest = await getContestById(params.id);
      if (contest) {
        setContestData({
          id: contest.id!,
          title: contest.title,
          description: contest.description,
          longDescription: JSON.parse(contest.longDescription),
          startTime: contest.startTime,
          endTime: contest.endTime,
          maxTeamSize: contest.maxTeamSize,
          organizers: contest.organizers,
          penalty: contest.penalty,
        });
      } else {
        toast.error("Failed to fetch contest");
      }
      setLoading(false);
    };

    fetchContest();
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContestData({
      ...contestData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLongDescriptionChange = (value: any) => {
    setContestData({
      ...contestData,
      longDescription: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const contestDataToSend = { ...contestData };

    // Ensure title is not empty
    if (!contestDataToSend.title) {
      toast.error("Please provide a title");
      return;
    }

    // Ensure description is not empty
    if (!contestDataToSend.description) {
      toast.error("Please provide a description");
      return;
    }

    // If longDescription is undefined, set it to description
    if (!contestDataToSend.longDescription) {
      contestDataToSend.longDescription = JSON.stringify([
        {
          type: "p",
          children: [{ text: contestDataToSend.description }],
        },
      ]);
    } else {
      contestDataToSend.longDescription = JSON.stringify(
        contestDataToSend.longDescription,
        (key, value) => (key === "id" ? undefined : value)
      );
    }

    // Ensure startTime and endTime are not empty
    if (!contestDataToSend.startTime || !contestDataToSend.endTime) {
      toast.error("Please provide start and end time");
      return;
    }

    // Ensure that endTime is after startTime
    const startTime = new Date(contestDataToSend.startTime);
    const endTime = new Date(contestDataToSend.endTime);

    if (startTime >= endTime) {
      toast.error("End time must be after start time");
      return;
    }

    // Ensure that maxTeamSize is greater than 1
    if (contestDataToSend.maxTeamSize < 2) {
      toast.error("Max team size must be greater than 1");
      return;
    }

    // Ensure that penalty value is greater than 0 if penalty is on
    if (
      contestDataToSend.penalty.isOn &&
      contestDataToSend.penalty.value <= 0
    ) {
      toast.error("Penalty value must be greater than 0");
      return;
    }

    console.log(contestDataToSend);

    const toastId = toast.loading("Updating contest...");

    updateContest(contestDataToSend as NewContestData).then((response) => {
      if (response.success) {
        toast.success("Contest updated successfully", {
          id: toastId,
          duration: 3000,
          action: {
            label: <IoClose />,
            onClick: () => toast.dismiss(),
          },
        });
        router.push(Routes.MANAGE_CONTESTS);
      } else {
        toast.error(response.message, {
          id: toastId,
          duration: 3000,
          action: {
            label: <IoClose />,
            onClick: () => toast.dismiss(),
          },
        });
      }
    });
  };

  if (loading) {
    return (
      <MainPage activeNav={navTitles.Contests}>
        <Heading>Edit Contest</Heading>
        <div className="flex items-start justify-center h-screen">
          <ImSpinner8 className="animate-spin h-10 w-10 text-white-100 mt-12" />
        </div>
        <Footer />
      </MainPage>
    );
  }

  return (
    <MainPage activeNav={navTitles.Contests}>
      <Heading>Edit Contest - {contestData.title}</Heading>

      <form className="my-4" onSubmit={handleSubmit}>
        <div className="flex gap-0 md:gap-4 flex-col md:flex-row">
          <LabelInputContainer className="w-full md:w-1/3">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              name="title"
              placeholder="Contest Title"
              value={contestData.title}
              onChange={handleChange}
            />
            <p className="text-muted-foreground text-sm">
              This will be displayed as the title of the contest. It will also
              be used to generate unique contest IDs.
            </p>
          </LabelInputContainer>
          <LabelInputContainer className="w-full md:w-2/3">
            <Label htmlFor="description">Description</Label>
            <Input
              type="text"
              id="description"
              name="description"
              placeholder="Short Description"
              value={contestData.description}
              onChange={handleChange}
            />
            <p className="text-muted-foreground text-sm">
              This will be displayed as the short description of the contest. It
              will be displayed on the table of contests. Keep it short and
              simple.
            </p>
          </LabelInputContainer>
        </div>
        <LabelInputContainer>
          <Label htmlFor="longDescription">Long Description</Label>
          <div className="border rounded">
            <TextEditor
              id="longDescription"
              name="longDescription"
              placeholder="Long Description"
              value={contestData.longDescription}
              onChange={handleLongDescriptionChange}
            />
          </div>
          <span className="text-muted-foreground text-sm">
            You can use{" "}
            <span className="font-bold text-white-100">markdown</span> to format
            the long description.{" "}
            <a
              href="https://www.markdownguide.org/basic-syntax/"
              target="_blank"
              rel="noreferrer"
              className="underline text-blue-400"
            >
              Learn more
            </a>{" "}
            about basic markdown syntax.
          </span>
          <p className="text-muted-foreground text-sm">
            This will be displayed as the long description of the contest. It
            will be displayed on the contest page. Use this to provide detailed
            information about the contest with markdown support.
          </p>
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="organizers">Organizers</Label>
          <MultipleSelector
            value={contestData.organizers.map((organizer) => ({
              label: organizer,
              value: organizer,
              dropdownLabel: organizer,
            }))}
            onSearch={async (value) => {
              const users = await searchUsers(value);
              return users.map((user) => ({
                label: user.id,
                dropdownLabel: `${user.id} (${user.name} - ${user.email})`,
                value: user.id,
              }));
            }}
            placeholder="Search organizers"
            loadingIndicator={
              <p className="py-2 text-center leading-10 text-muted-foreground">
                Searching users...
              </p>
            }
            emptyIndicator={
              <p className="w-full text-center leading-10 text-muted-foreground">
                No users found
              </p>
            }
            onChange={(options) => {
              setContestData({
                ...contestData,
                organizers: options.map((option) => option.value) as string[],
              });
            }}
          />
          <p className="text-muted-foreground text-sm">
            These users will be added as organizers of the contest. They will
            have access to manage the contest.
          </p>
        </LabelInputContainer>
        <div className="flex gap-0 md:gap-4 flex-col md:flex-row">
          <LabelInputContainer className="w-full md:w-1/2">
            <Label htmlFor="startTime">Start Time</Label>
            <DateTimePicker
              date={
                contestData.startTime
                  ? new Date(contestData.startTime)
                  : undefined
              }
              setDate={(date) => {
                setContestData({
                  ...contestData,
                  startTime: date?.toISOString() || "",
                });
              }}
            />
            <p className="text-muted-foreground text-sm">
              This is the time when the contest will start. Select your local
              time.
            </p>
          </LabelInputContainer>
          <LabelInputContainer className="w-full md:w-1/2">
            <Label htmlFor="endTime">End Time</Label>
            <DateTimePicker
              date={
                contestData.endTime ? new Date(contestData.endTime) : undefined
              }
              setDate={(date) => {
                setContestData({
                  ...contestData,
                  endTime: date?.toISOString() || "",
                });
              }}
            />
            <p className="text-muted-foreground text-sm">
              This is the time when the contest will end. Select your local
              time.
            </p>
          </LabelInputContainer>
        </div>
        <div className="flex gap-0 md:gap-4 flex-col md:flex-row">
          <LabelInputContainer>
            <Label htmlFor="maxTeamSize">Max Team Size</Label>
            <Input
              type="number"
              id="maxTeamSize"
              name="maxTeamSize"
              value={contestData.maxTeamSize}
              onChange={handleChange}
            />
            <p className="text-muted-foreground text-sm">
              This is the maximum number of members allowed in a team. The
              default value is 2.
            </p>
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="penalty.value">Penalty</Label>
            <div className="flex gap-4 justify-center">
              <div className="w-1/2 md:w-2/3 flex justify-between items-center gap-2">
                <Input
                  type="number"
                  id="penalty.value"
                  name="penalty.value"
                  value={contestData.penalty.value || ""}
                  onChange={(e) => {
                    const newValue = parseInt(e.target.value) || 0;
                    setContestData({
                      ...contestData,
                      penalty: {
                        isOn: newValue > 0,
                        value: newValue,
                      },
                    });
                  }}
                />
              </div>
              <div className="w-1/2 md:w-1/3 flex justify-start items-center gap-2 border rounded-md px-2">
                <Switch
                  id="penalty.isOn"
                  name="penalty.isOn"
                  checked={contestData.penalty.isOn}
                  onClick={() => {
                    setContestData({
                      ...contestData,
                      penalty: {
                        ...contestData.penalty,
                        isOn: !contestData.penalty.isOn,
                      },
                    });
                  }}
                />
                <Label htmlFor="penalty.isOn">
                  Penalty {contestData.penalty.isOn ? "On" : "Off"}
                </Label>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              This is the penalty value for each wrong submission. The default
              value is 0. If the penalty is on, on wrong submission of a
              problem, penalty value will be subtracted from the total score.
            </p>
          </LabelInputContainer>
        </div>

        <Button type="submit" className="mt-4">
          Update Contest
        </Button>
      </form>

      <Footer />
    </MainPage>
  );
};

export default EditContest;
