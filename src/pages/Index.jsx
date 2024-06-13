import { Container, Text, VStack, Box, Heading, List, ListItem, ListIcon, Progress } from "@chakra-ui/react";
import { FaCheckCircle, FaHourglassHalf } from "react-icons/fa";

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
  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={8} width="100%">
        <Heading as="h1" size="xl">Technical Dashboard</Heading>
        {milestones.map((milestone, index) => (
          <Box key={index} p={5} shadow="md" borderWidth="1px" width="100%">
            <Heading as="h2" size="lg" mb={4}>{milestone.title}</Heading>
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
        ))}
      </VStack>
    </Container>
  );
};

export default Index;