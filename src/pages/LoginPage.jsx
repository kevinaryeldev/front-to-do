import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
  Alert,
  AlertIcon,
  InputGroup,
  InputRightElement,
  IconButton,
  Badge,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FIXED_CREDENTIALS = {
  user: "admin",
  password: "1234",
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simula delay de requisição
    setTimeout(() => {
      if (
        user === FIXED_CREDENTIALS.user &&
        password === FIXED_CREDENTIALS.password
      ) {
        localStorage.setItem("whatsnext_token", "fake-jwt-token-xyz-2026");
        localStorage.setItem("whatsnext_user", user);
        navigate("/dashboard");
      } else {
        setError("Usuário ou senha incorretos.");
      }
      setLoading(false);
    }, 700);
  }

  return (
    <Box minH="100vh" bg="beige.100" display="flex" flexDirection="column">
      {/* Navbar simples */}
      <Box
        bg="white"
        borderBottom="2px solid"
        borderColor="beige.200"
        px={6}
        py={4}
        shadow="sm"
      >
        <Flex maxW="1100px" mx="auto" justify="space-between" align="center">
          <Heading
            size="md"
            color="brand.500"
            cursor="pointer"
            onClick={() => navigate("/")}
          >
            Whats Next??!
          </Heading>
          <Text fontSize="sm" color="gray.500">
            Acesse sua conta abaixo
          </Text>
        </Flex>
      </Box>

      {/* Formulário */}
      <Flex flex={1} align="center" justify="center" py={12} px={6}>
        <Box w="full" maxW="420px">
          <Box
            bg="white"
            border="2px solid"
            borderColor="brand.100"
            borderRadius="2xl"
            shadow="lg"
            p={{ base: 8, md: 10 }}
          >
            <VStack spacing={1} mb={8} textAlign="center">
              <Heading size="lg" color="brand.700">Bem-vindo de volta!</Heading>
              <Text fontSize="sm" color="gray.500">
                Acesse sua conta para gerenciar suas tarefas
              </Text>
            </VStack>

            {error && (
              <Alert
                data-test-id="alert-login-error"
                status="error"
                borderRadius="xl"
                mb={5}
                fontSize="sm"
              >
                <AlertIcon />
                {error}
              </Alert>
            )}

            <form onSubmit={handleLogin} data-test-id="form-login">
              <VStack spacing={5}>
                <FormControl isRequired>
                  <FormLabel fontSize="sm" fontWeight="semibold" color="gray.700">
                    Usuário
                  </FormLabel>
                  <Input
                    data-test-id="input-username"
                    placeholder="Digite seu usuário"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    borderRadius="xl"
                    borderColor="brand.200"
                    _hover={{ borderColor: "brand.400" }}
                    _focus={{ borderColor: "brand.500", boxShadow: "0 0 0 1px #3182CE" }}
                    bg="beige.50"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel fontSize="sm" fontWeight="semibold" color="gray.700">
                    Senha
                  </FormLabel>
                  <InputGroup>
                    <Input
                      data-test-id="input-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Digite sua senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      borderRadius="xl"
                      borderColor="brand.200"
                      _hover={{ borderColor: "brand.400" }}
                      _focus={{ borderColor: "brand.500", boxShadow: "0 0 0 1px #3182CE" }}
                      bg="beige.50"
                    />
                    <InputRightElement>
                      <Button
                        data-test-id="btn-toggle-password"
                        size="xs"
                        variant="ghost"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                        color="gray.400"
                        mt={1}
                      >
                        {showPassword ? "🙈" : "👁️"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <Button
                  data-test-id="btn-login-submit"
                  type="submit"
                  colorScheme="brand"
                  w="full"
                  size="lg"
                  borderRadius="xl"
                  isLoading={loading}
                  loadingText="Entrando..."
                  mt={2}
                  shadow="md"
                  _hover={{ shadow: "lg", transform: "translateY(-1px)" }}
                  transition="all 0.2s"
                >
                  Entrar
                </Button>
              </VStack>
            </form>
          </Box>

          {/* Hint de credenciais */}
          <Box
            data-test-id="credentials-hint"
            mt={5}
            bg="brand.50"
            border="1px dashed"
            borderColor="brand.300"
            borderRadius="xl"
            p={4}
            textAlign="center"
          >
            <Badge colorScheme="blue" mb={2}>Credenciais de teste</Badge>
            <Text fontSize="sm" color="gray.600">
              Usuário: <strong>admin</strong> &nbsp;|&nbsp; Senha: <strong>1234</strong>
            </Text>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
