"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  Canvas,
  NotFoundContainer,
  Text,
  ToNavLink,
} from "@/styles/NotFoundPage.styled";

const NotFoundPage = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const letters: number[] = Array(256).fill(0);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00f0ffcc";
      letters.forEach((y_pos, index) => {
        const text = String.fromCharCode(0x30a0 + Math.random() * 96);
        const x_pos = index * 10;
        ctx.fillText(text, x_pos, y_pos);
        letters[index] = y_pos > 758 + Math.random() * 1e4 ? 0 : y_pos + 10;
      });
    };

    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, []);

  return (
    <NotFoundContainer>
      <Canvas ref={canvasRef} />
      <Text>Ooops! This page not found :(</Text>
      <ToNavLink as={Link} href="/">
        To home page
      </ToNavLink>
    </NotFoundContainer>
  );
};

export default NotFoundPage;
