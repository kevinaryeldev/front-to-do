import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  SimpleGrid,
  Icon,
  chakra,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const FeatureCard = ({ emoji, title, description }) => (
  <Box
    bg="white"
    border="2px solid"
    borderColor="brand.200"
    borderRadius="2xl"
    p={6}
    shadow="md"
    _hover={{ shadow: "lg", transform: "translateY(-2px)", transition: "all 0.2s" }}
    transition="all 0.2s"
  >
    <Text fontSize="2xl" mb={3}>{emoji}</Text>
    <Heading size="sm" color="brand.600" mb={2}>{title}</Heading>
    <Text fontSize="sm" color="gray.600">{description}</Text>
  </Box>
);

const UrgencyDemo = ({ label, color, bg }) => (
  <HStack
    bg={bg}
    border="2px solid"
    borderColor={color}
    borderRadius="xl"
    px={4}
    py={3}
    spacing={3}
  >
    <Box w={3} h={3} borderRadius="full" bg={color} />
    <Text fontSize="sm" fontWeight="semibold" color="gray.700">{label}</Text>
  </HStack>
);

export default function LandingPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("whatsnext_token");

  return (
    <Box minH="100vh" bg="beige.100">
      {/* Navbar */}
      <Box
        bg="white"
        borderBottom="2px solid"
        borderColor="beige.200"
        px={6}
        py={4}
        position="sticky"
        top={0}
        zIndex={10}
        shadow="sm"
      >
        <Flex maxW="1100px" mx="auto" justify="space-between" align="center">
          <Heading size="md" color="brand.500" letterSpacing="tight">
            Whats Next??!
          </Heading>
          <HStack spacing={3}>
            {token ? (
              <Button
                data-test-id="btn-nav-dashboard"
                colorScheme="brand"
                size="sm"
                borderRadius="full"
                onClick={() => navigate("/dashboard")}
              >
                Ir para o Dashboard
              </Button>
            ) : (
              <Button
                data-test-id="btn-nav-login"
                colorScheme="brand"
                size="sm"
                borderRadius="full"
                onClick={() => navigate("/login")}
              >
                Entrar
              </Button>
            )}
          </HStack>
        </Flex>
      </Box>

      {/* Hero */}
      <Box
        bgGradient="linear(to-br, brand.50, beige.100, beige.200)"
        py={{ base: 16, md: 24 }}
        px={6}
      >
        <Container maxW="800px" textAlign="center">
          <Badge
            colorScheme="blue"
            variant="subtle"
            borderRadius="full"
            px={4}
            py={1}
            mb={6}
            fontSize="sm"
          >
            Organize sua vida, uma tarefa por vez
          </Badge>
          <Heading
            size="2xl"
            color="brand.700"
            mb={4}
            lineHeight="shorter"
            letterSpacing="tight"
          >
            Whats Next??!
          </Heading>
          <Text fontSize="xl" color="gray.600" mb={8} maxW="540px" mx="auto">
            O gerenciador de tarefas mais simples e visual que você vai usar.
            Crie notas, classifique por urgência e nunca perca o foco do que importa.
          </Text>
          <HStack spacing={4} justify="center" flexWrap="wrap">
            <Button
              colorScheme="brand"
              size="lg"
              borderRadius="full"
              px={10}
              shadow="md"
              _hover={{ shadow: "lg", transform: "translateY(-1px)" }}
              transition="all 0.2s"
              data-test-id="btn-hero-login"
            onClick={() => navigate("/login")}
            >
              Entrar
            </Button>
          </HStack>
        </Container>
      </Box>

      {/* Urgency preview */}
      <Container maxW="700px" py={14} px={6} textAlign="center">
        <Heading size="md" color="brand.600" mb={2}>Classifique por urgência</Heading>
        <Text color="gray.500" mb={8} fontSize="sm">
          Cada tarefa ganha uma cor de acordo com o nível de prioridade
        </Text>
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
          <UrgencyDemo label="Baixa" color="green.400" bg="green.50" />
          <UrgencyDemo label="Média" color="yellow.400" bg="yellow.50" />
          <UrgencyDemo label="Alta" color="orange.400" bg="orange.50" />
          <UrgencyDemo label="Urgente" color="red.500" bg="red.50" />
        </SimpleGrid>
      </Container>

      {/* Features */}
      <Box bg="white" py={14} px={6} borderTop="2px solid" borderColor="beige.200">
        <Container maxW="900px">
          <Heading textAlign="center" size="lg" color="brand.700" mb={10}>
            Tudo que você precisa
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <FeatureCard
              emoji="📝"
              title="Notas rápidas"
              description="Escreva suas tarefas em segundos, sem burocracia ou configurações complexas."
            />
            <FeatureCard
              emoji="🎨"
              title="Cores por urgência"
              description="Identifique visualmente o que precisa de atenção imediata com um sistema de cores intuitivo."
            />
            <FeatureCard
              emoji="✅"
              title="Marque como concluído"
              description="Acompanhe seu progresso e sinta a satisfação de riscar tarefas da lista."
            />
          </SimpleGrid>
        </Container>
      </Box>

      {/* CTA */}
      <Box
        bgGradient="linear(to-r, brand.400, brand.600)"
        py={14}
        px={6}
        textAlign="center"
      >
        <Heading color="white" size="lg" mb={4}>
          Pronto para organizar sua vida?
        </Heading>
        <Text color="blue.100" mb={8}>
          Acesse agora e comece a gerenciar suas tarefas!
        </Text>
        <Button
          data-test-id="btn-cta-login"
          bg="white"
          color="brand.600"
          size="lg"
          borderRadius="full"
          px={10}
          _hover={{ bg: "beige.100" }}
          onClick={() => navigate("/login")}
        >
          Entrar agora
        </Button>
      </Box>

      {/* Footer */}
      <Box bg="beige.200" py={6} px={6} borderTop="1px solid" borderColor="beige.300">
        <Container maxW="1100px">
          <Flex justify="space-between" align="center" flexWrap="wrap" gap={2}>
            <Text fontWeight="bold" color="brand.600">Whats Next??!</Text>
            <Text fontSize="sm" color="gray.500">© 2026 — Apenas para fins de teste</Text>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}
