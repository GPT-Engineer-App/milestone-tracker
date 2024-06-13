import { Container, Text, VStack, Box, Heading, List, ListItem, ListIcon, Progress, HStack, IconButton, Collapse, Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { FaCheckCircle, FaHourglassHalf, FaChevronDown, FaChevronUp, FaPlus } from "react-icons/fa";
import { useState } from "react";

const Index = () => {
  const [milestones, setMilestones] = useState([
    {
      title: "Milestone 1",
      date: "2023-10-01",
      requirements: [
        { text: "Requirement 1.1", completed: true },
        { text: "Requirement 1.2", completed: false },
        { text: "Requirement 1.3", completed: true },
      ],
    },
    {
      title: "Milestone 2",
      date: "2023-11-01",
      requirements: [
        { text: "Requirement 2.1", completed: false },
        { text: "Requirement 2.2", completed: false },
      ],
    },
  ]);

  const [visibleMilestones, setVisibleMilestones] = useState({});
  const [newMilestoneTitle, setNewMilestoneTitle] = useState("");
  const [newMilestoneDate, setNewMilestoneDate] = useState("");
  const [newRequirement, setNewRequirement] = useState({});

  const toggleVisibility = (index) => {
    setVisibleMilestones((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
    if (!newRequirement[index]) {
      setNewRequirement((prev) => ({
        ...prev,
        [index]: "",
      }));
    }
  };

  const addMilestone = () => {
    if (newMilestoneTitle && newMilestoneDate) {
      setMilestones((prev) => [
        ...prev,
        {
          title: newMilestoneTitle,
          date: newMilestoneDate,
          requirements: [],
        },
      ]);
      setNewMilestoneTitle("");
      setNewMilestoneDate("");
    }
  };

  const addRequirement = (milestoneIndex) => {
    if (newRequirement[milestoneIndex]) {
      setMilestones((prev) => {
        const updatedMilestones = [...prev];
        updatedMilestones[milestoneIndex].requirements.push({
          text: newRequirement[milestoneIndex],
          completed: false,
        });
        return updatedMilestones;
      });
      setNewRequirement((prev) => ({
        ...prev,
        [milestoneIndex]: "",
      }));
    }
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={12} width="100%">
        <Heading as="h1" size="xl">Technical Dashboard</Heading>
        <Box position="relative" width="100%" height="2px" bg="gray.300" my={10}>
          {milestones.map((milestone, index) => (
            <Box key={index} position="absolute" left={`${(index / (milestones.length - 1)) * 100}%`} transform="translateX(-50%)">
              <VStack spacing={4} align="stretch">
                <IconButton
                  icon={visibleMilestones[index] ? <FaChevronUp /> : <FaChevronDown />}
                  onClick={() => toggleVisibility(index)}
                  size="sm"
                  variant="outline"
                  aria-label="Toggle Requirements"
                />
                <Text>{milestone.title}</Text>
                <Text fontSize="sm" color="gray.500">Date: {milestone.date}</Text>
                <Collapse in={visibleMilestones[index]}>
                  <Box p={6} shadow="md" borderWidth="1px" width="250px" bg="white">
                    <List spacing={3}>
                      {milestone.requirements.map((req, reqIndex) => (
                        <ListItem key={reqIndex}>
                          <ListIcon as={req.completed ? FaCheckCircle : FaHourglassHalf} color={req.completed ? "green.500" : "yellow.500"} />
                          {req.text}
                        </ListItem>
                      ))}
                    </List>
                    <Progress value={(milestone.requirements.filter(req => req.completed).length / milestone.requirements.length) * 100} size="sm" mt={4} />
                    <InputGroup mt={6}>
                      <Input
                        placeholder="New Requirement"
                        value={newRequirement[index] || ""}
                        onChange={(e) => setNewRequirement((prev) => ({
                          ...prev,
                          [index]: e.target.value,
                        }))}
                      />
                      <InputRightElement>
                        <Button onClick={() => addRequirement(index)} leftIcon={<FaPlus />} colorScheme="teal">
                          Add
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </Box>
                </Collapse>
              </VStack>
            </Box>
          ))}
        </Box>
        <VStack spacing={6} width="100%">
          <InputGroup>
            <Input
              placeholder="New Milestone Title"
              value={newMilestoneTitle}
              onChange={(e) => setNewMilestoneTitle(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <Input
              type="date"
              placeholder="New Milestone Date"
              value={newMilestoneDate}
              onChange={(e) => setNewMilestoneDate(e.target.value)}
            />
            <InputRightElement>
              <Button onClick={addMilestone} leftIcon={<FaPlus />} colorScheme="teal">
                Add Milestone
              </Button>
            </InputRightElement>
          </InputGroup>
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;