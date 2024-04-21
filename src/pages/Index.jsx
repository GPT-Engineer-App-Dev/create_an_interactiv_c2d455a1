import { useState } from "react";
import { Box, Button, Flex, Grid, Text, useToast } from "@chakra-ui/react";
import { FaRobot, FaUser } from "react-icons/fa";

const Index = () => {
  const toast = useToast();
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (gameOver || board[index]) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    const winner = calculateWinner(newBoard);
    if (winner) {
      setGameOver(true);
      toast({
        title: `Player ${winner} wins!`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else if (!newBoard.includes(null)) {
      setGameOver(true);
      toast({
        title: "Draw!",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    } else {
      setIsXNext(!isXNext);
      if (!isXNext) {
        aiMove(newBoard);
      }
    }
  };

  const aiMove = (newBoard) => {
    let available = [];
    newBoard.forEach((cell, idx) => {
      if (cell === null) available.push(idx);
    });
    const randomMove = available[Math.floor(Math.random() * available.length)];
    setTimeout(() => handleClick(randomMove), 500);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameOver(false);
  };

  return (
    <Flex direction="column" align="center" justify="center" height="100vh">
      <Text fontSize="2xl" mb={4}>
        Tic Tac Toe <FaUser /> vs <FaRobot />
      </Text>
      <Grid templateColumns="repeat(3, 1fr)" gap={2}>
        {board.map((cell, index) => (
          <Button key={index} height="100px" width="100px" onClick={() => handleClick(index)} disabled={gameOver}>
            {cell}
          </Button>
        ))}
      </Grid>
      <Button mt={4} onClick={resetGame} colorScheme="teal">
        New Game
      </Button>
    </Flex>
  );
};

export default Index;
