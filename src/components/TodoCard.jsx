import {
  Box,
  Badge,
  Text,
  HStack,
  IconButton,
  Tooltip,
  VStack,
} from "@chakra-ui/react";

const URGENCY_CONFIG = {
  baixa: {
    label: "Baixa",
    bg: "green.50",
    border: "green.300",
    badge: "green",
    dot: "green.400",
  },
  media: {
    label: "Média",
    bg: "yellow.50",
    border: "yellow.300",
    badge: "yellow",
    dot: "yellow.400",
  },
  alta: {
    label: "Alta",
    bg: "orange.50",
    border: "orange.300",
    badge: "orange",
    dot: "orange.400",
  },
  urgente: {
    label: "Urgente",
    bg: "red.50",
    border: "red.400",
    badge: "red",
    dot: "red.500",
  },
};

export default function TodoCard({ todo, onDelete, onToggleDone }) {
  const config = URGENCY_CONFIG[todo.urgency] || URGENCY_CONFIG.baixa;

  return (
    <Box
      data-test-id="todo-card"
      data-urgency={todo.urgency}
      data-done={todo.done}
      bg={config.bg}
      border="2px solid"
      borderColor={config.border}
      borderRadius="2xl"
      p={5}
      shadow="sm"
      opacity={todo.done ? 0.55 : 1}
      transition="all 0.2s"
      _hover={{ shadow: "md" }}
      position="relative"
    >
      <VStack align="stretch" spacing={3}>
        {/* Header */}
        <HStack justify="space-between" align="flex-start">
          <HStack spacing={2} flexWrap="wrap">
            <Box w={2.5} h={2.5} borderRadius="full" bg={config.dot} mt={1} flexShrink={0} />
            <Badge
              data-test-id="todo-card-urgency"
              colorScheme={config.badge}
              borderRadius="full"
              fontSize="xs"
              px={2}
            >
              {config.label}
            </Badge>
          </HStack>
          <HStack spacing={1}>
            <Tooltip label={todo.done ? "Marcar como pendente" : "Marcar como feito"}>
              <IconButton
                data-test-id="todo-card-toggle"
                icon={<Text>{todo.done ? "↩️" : "✅"}</Text>}
                size="xs"
                variant="ghost"
                borderRadius="lg"
                onClick={() => onToggleDone(todo.id)}
                aria-label="toggle done"
              />
            </Tooltip>
            <Tooltip label="Excluir tarefa">
              <IconButton
                data-test-id="todo-card-delete"
                icon={<Text>🗑️</Text>}
                size="xs"
                variant="ghost"
                borderRadius="lg"
                onClick={() => onDelete(todo.id)}
                aria-label="delete todo"
              />
            </Tooltip>
          </HStack>
        </HStack>

        {/* Title */}
        <Text
          data-test-id="todo-card-title"
          fontWeight="semibold"
          color="gray.800"
          fontSize="md"
          textDecoration={todo.done ? "line-through" : "none"}
          lineHeight="short"
        >
          {todo.title}
        </Text>

        {/* Note */}
        {todo.note && (
          <Text
            data-test-id="todo-card-note"
            fontSize="sm"
            color="gray.600"
            textDecoration={todo.done ? "line-through" : "none"}
            lineHeight="tall"
          >
            {todo.note}
          </Text>
        )}

        {/* Footer */}
        <Text data-test-id="todo-card-date" fontSize="xs" color="gray.400" mt={1}>
          {new Date(todo.createdAt).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </VStack>
    </Box>
  );
}
