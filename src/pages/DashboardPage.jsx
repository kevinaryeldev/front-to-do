import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Text,
  Textarea,
  VStack,
  HStack,
  SimpleGrid,
  Badge,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Stat,
  StatLabel,
  StatNumber,
  Divider,
  Alert,
  AlertIcon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TodoCard from "../components/TodoCard";

const URGENCY_OPTIONS = [
  { value: "baixa", label: "🟢 Baixa" },
  { value: "media", label: "🟡 Média" },
  { value: "alta", label: "🟠 Alta" },
  { value: "urgente", label: "🔴 Urgente" },
];

const FILTER_OPTIONS = [
  { value: "all", label: "Todas" },
  { value: "pending", label: "Pendentes" },
  { value: "done", label: "Concluídas" },
  { value: "baixa", label: "🟢 Baixa" },
  { value: "media", label: "🟡 Média" },
  { value: "alta", label: "🟠 Alta" },
  { value: "urgente", label: "🔴 Urgente" },
];

function useTodos() {
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem("whatsnext_todos");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("whatsnext_todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo(todo) {
    setTodos((prev) => [
      { ...todo, id: Date.now(), createdAt: new Date().toISOString(), done: false },
      ...prev,
    ]);
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function toggleDone(id) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  return { todos, addTodo, deleteTodo, toggleDone };
}

const STAT_TEST_IDS = {
  Total: "stat-total",
  Pendentes: "stat-pending",
  Concluídas: "stat-done",
  Urgentes: "stat-urgent",
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { todos, addTodo, deleteTodo, toggleDone } = useTodos();

  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [urgency, setUrgency] = useState("media");
  const [filter, setFilter] = useState("all");
  const [formError, setFormError] = useState("");

  const username = localStorage.getItem("whatsnext_user") || "admin";

  function handleLogout() {
    localStorage.removeItem("whatsnext_token");
    localStorage.removeItem("whatsnext_user");
    navigate("/login");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) {
      setFormError("O título é obrigatório.");
      return;
    }
    addTodo({ title: title.trim(), note: note.trim(), urgency });
    setTitle("");
    setNote("");
    setUrgency("media");
    setFormError("");
    onClose();
  }

  const filteredTodos = todos.filter((t) => {
    if (filter === "all") return true;
    if (filter === "pending") return !t.done;
    if (filter === "done") return t.done;
    return t.urgency === filter;
  });

  const stats = {
    total: todos.length,
    pending: todos.filter((t) => !t.done).length,
    done: todos.filter((t) => t.done).length,
    urgente: todos.filter((t) => t.urgency === "urgente" && !t.done).length,
  };

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
        <Flex maxW="1200px" mx="auto" justify="space-between" align="center">
          <Heading size="md" color="brand.500" letterSpacing="tight">
            Whats Next??!
          </Heading>
          <HStack spacing={4}>
            <Button
              data-test-id="btn-new-task"
              colorScheme="brand"
              size="sm"
              borderRadius="full"
              onClick={onOpen}
              leftIcon={<Text>+</Text>}
            >
              Nova tarefa
            </Button>
            <Menu>
              <MenuButton>
                <HStack spacing={2} cursor="pointer" data-test-id="menu-user">
                  <Avatar size="sm" name={username} bg="brand.400" color="white" />
                  <Text fontSize="sm" fontWeight="medium" color="gray.700" display={{ base: "none", md: "block" }}>
                    {username}
                  </Text>
                </HStack>
              </MenuButton>
              <MenuList shadow="lg" borderRadius="xl" border="1px solid" borderColor="beige.200">
                <MenuItem fontSize="sm" color="gray.500" cursor="default" _hover={{ bg: "transparent" }}>
                  Logado como <strong>&nbsp;{username}</strong>
                </MenuItem>
                <Divider />
                <MenuItem
                  data-test-id="btn-logout"
                  fontSize="sm"
                  color="red.500"
                  borderRadius="lg"
                  onClick={handleLogout}
                >
                  🚪 Sair
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>
      </Box>

      <Container maxW="1200px" py={8} px={6}>
        {/* Stats */}
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} mb={8}>
          {[
            { label: "Total", value: stats.total, color: "brand.600", bg: "brand.50" },
            { label: "Pendentes", value: stats.pending, color: "orange.600", bg: "orange.50" },
            { label: "Concluídas", value: stats.done, color: "green.600", bg: "green.50" },
            { label: "Urgentes", value: stats.urgente, color: "red.600", bg: "red.50" },
          ].map(({ label, value, color, bg }) => (
            <Box
              key={label}
              data-test-id={STAT_TEST_IDS[label]}
              bg={bg}
              borderRadius="2xl"
              p={5}
              border="1px solid"
              borderColor="beige.200"
              shadow="sm"
            >
              <Text fontSize="xs" color="gray.500" fontWeight="semibold" textTransform="uppercase" letterSpacing="wide">
                {label}
              </Text>
              <Text
                data-test-id={`${STAT_TEST_IDS[label]}-value`}
                fontSize="3xl"
                fontWeight="bold"
                color={color}
                mt={1}
              >
                {value}
              </Text>
            </Box>
          ))}
        </SimpleGrid>

        {/* Filtros */}
        <Flex mb={6} gap={2} flexWrap="wrap" align="center">
          <Text fontSize="sm" fontWeight="semibold" color="gray.600" mr={1}>
            Filtrar:
          </Text>
          {FILTER_OPTIONS.map(({ value, label }) => (
            <Button
              key={value}
              data-test-id={`filter-${value}`}
              size="sm"
              borderRadius="full"
              variant={filter === value ? "solid" : "outline"}
              colorScheme={filter === value ? "brand" : "gray"}
              onClick={() => setFilter(value)}
              fontSize="xs"
            >
              {label}
            </Button>
          ))}
        </Flex>

        {/* Cards */}
        {filteredTodos.length === 0 ? (
          <Box
            data-test-id="empty-state"
            bg="white"
            border="2px dashed"
            borderColor="beige.300"
            borderRadius="2xl"
            p={16}
            textAlign="center"
          >
            <Text fontSize="4xl" mb={4}>📋</Text>
            <Heading size="sm" color="gray.500" mb={2}>
              {filter === "all"
                ? "Nenhuma tarefa ainda"
                : "Nenhuma tarefa nessa categoria"}
            </Heading>
            <Text fontSize="sm" color="gray.400">
              {filter === "all"
                ? "Clique em 'Nova tarefa' para começar"
                : "Tente outro filtro ou crie novas tarefas"}
            </Text>
          </Box>
        ) : (
          <SimpleGrid data-test-id="todo-list" columns={{ base: 1, sm: 2, lg: 3, xl: 4 }} spacing={5}>
            {filteredTodos.map((todo) => (
              <TodoCard
                key={todo.id}
                todo={todo}
                onDelete={deleteTodo}
                onToggleDone={toggleDone}
              />
            ))}
          </SimpleGrid>
        )}
      </Container>

      {/* Drawer: Nova tarefa */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
        <DrawerOverlay backdropFilter="blur(2px)" />
        <DrawerContent bg="beige.50" borderLeft="2px solid" borderColor="brand.200">
          <DrawerCloseButton data-test-id="btn-close-drawer" />
          <DrawerHeader
            borderBottom="1px solid"
            borderColor="beige.200"
            color="brand.700"
            fontSize="lg"
          >
            Nova tarefa
          </DrawerHeader>
          <DrawerBody py={6}>
            <form onSubmit={handleSubmit} data-test-id="form-new-task">
              <VStack spacing={5}>
                {formError && (
                  <Alert
                    data-test-id="alert-form-error"
                    status="error"
                    borderRadius="xl"
                    fontSize="sm"
                  >
                    <AlertIcon />
                    {formError}
                  </Alert>
                )}

                <FormControl isRequired>
                  <FormLabel fontSize="sm" fontWeight="semibold" color="gray.700">
                    Título
                  </FormLabel>
                  <Input
                    data-test-id="input-task-title"
                    placeholder="O que precisa ser feito?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    borderRadius="xl"
                    borderColor="brand.200"
                    bg="white"
                    _hover={{ borderColor: "brand.400" }}
                    _focus={{ borderColor: "brand.500", boxShadow: "0 0 0 1px #3182CE" }}
                    maxLength={80}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize="sm" fontWeight="semibold" color="gray.700">
                    Nota (opcional)
                  </FormLabel>
                  <Textarea
                    data-test-id="input-task-note"
                    placeholder="Adicione detalhes ou contexto..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    borderRadius="xl"
                    borderColor="brand.200"
                    bg="white"
                    _hover={{ borderColor: "brand.400" }}
                    _focus={{ borderColor: "brand.500", boxShadow: "0 0 0 1px #3182CE" }}
                    rows={4}
                    maxLength={300}
                    resize="vertical"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel fontSize="sm" fontWeight="semibold" color="gray.700">
                    Urgência
                  </FormLabel>
                  <Select
                    data-test-id="select-task-urgency"
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value)}
                    borderRadius="xl"
                    borderColor="brand.200"
                    bg="white"
                    _hover={{ borderColor: "brand.400" }}
                    _focus={{ borderColor: "brand.500", boxShadow: "0 0 0 1px #3182CE" }}
                  >
                    {URGENCY_OPTIONS.map(({ value, label }) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </Select>
                </FormControl>

                <Flex gap={3} w="full" mt={2}>
                  <Button
                    data-test-id="btn-cancel-task"
                    variant="outline"
                    colorScheme="gray"
                    borderRadius="xl"
                    flex={1}
                    onClick={onClose}
                  >
                    Cancelar
                  </Button>
                  <Button
                    data-test-id="btn-submit-task"
                    type="submit"
                    colorScheme="brand"
                    borderRadius="xl"
                    flex={1}
                    shadow="md"
                  >
                    Adicionar
                  </Button>
                </Flex>
              </VStack>
            </form>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
