import { Container, Text, VStack, Box, Heading, List, ListItem, ListIcon, Progress, HStack, IconButton, Collapse } from "@chakra-ui/react";
import { FaCheckCircle, FaHourglassHalf, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useState } from "react";

const milestones = [
  {
    title: "Milestone 1",
    requirements: [
      { text: "Requirement 1.1", completed: true },
      { text: "Requirement 1.2", completed: false },
      { text: "Requirement 1.3", completed: true },
    ],
  },
  {
    title: "Milestone 2",
    requirements: [
      { text: "Requirement 2.1", completed: false },
      { text: "Requirement 2.2", completed: false },
    ],
  },
];

const Index = () => {
  const [visibleMilestones, setVisibleMilestones] = useState({});

  const toggleVisibility = (index) => {
    setVisibleMilestones((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={8} width="100%">
        <Heading as="h1" size="xl">Technical Dashboard</Heading>
        <Box position="relative" width="100%" height="2px" bg="gray.300" my={10}>
          {milestones.map((milestone, index) => (
            <Box key={index} position="absolute" left={`${(index / (milestones.length - 1)) * 100}%`} transform="translateX(-50%)">
              <VStack spacing={2}>
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
                  <Box p={5} shadow="md" borderWidth="1px" width="200px">
                    <List spacing={3}>
                      {milestone.requirements.map((req, reqIndex) => (
                        <ListItem key={reqIndex}>
                          <ListIcon as={req.completed ? FaCheckCircle : FaHourglassHalf} color={req.completed ? "green.500" : "yellow.500"} />
                          {req.text}
                        </ListItem>
                      ))}
                    </List>
                    <Progress value={(milestone.requirements.filter(req => req.completed).length / milestone.requirements.length) * 100} size="sm" mt={4} />
                  </Box>
                </Collapse>
              </VStack>
            </Box>
          ))}
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;