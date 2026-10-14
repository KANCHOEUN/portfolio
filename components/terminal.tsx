"use client";

import type React from "react";

import { useState, useEffect, useRef, useCallback } from "react";
import { profileCopy } from "@/data/profile";
import { projects } from "@/data/projects";

export default function Terminal() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const hasExecutedRef = useRef(false);

  // Available commands array for navigation
  const availableCommands = ["whoami", "help", "skills", "history", "clear"];
  const [commandIndex, setCommandIndex] = useState(-1);

  // ASCII art for "Backend Developer"
  const asciiArt = `
 ___            _                _    ___                 _                         
| . > ___  ___ | |__ ___ ._ _  _| |  | . \\ ___  _ _  ___ | | ___  ___  ___  _ _     
| . \\<_> |/ | '| / // ._>| ' |/ . |  | | |/ ._>| | |/ ._>| |/ . \\| . \\/ ._>| '_>  _ 
|___/<___|\\_|_.|_\\_\\\\___.|_|_|\\___|  |___/\\___.|__/ \\___.|_|\\___/|  _/\\___.|_|   <_>
                                                                 |_|                
  `;

  // Personal info
  const getPersonalInfo = useCallback(() => {
    return `
${profileCopy["terminal.name"]}
${profileCopy["terminal.role"]}
      
${profileCopy["terminal.intro"]}
${profileCopy["terminal.beliefs"]}
      
${profileCopy["terminal.current.work"]}
${profileCopy["terminal.microservice.optimization"]}
${profileCopy["terminal.performance.tuning"]}
${profileCopy["terminal.opensource.contribution"]}
      `;
  }, []);

  // Typewriter effect
  const typeWriter = useCallback(async (text: string) => {
    setIsTyping(true);
    const lines = text.split("\n");

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      let currentLine = "";

      for (let j = 0; j < line.length; j++) {
        currentLine += line[j];

        setOutput((prev) => {
          const lastIndex = prev.length - 1;
          if (lastIndex >= 0 && prev[lastIndex] !== currentLine) {
            const newOutput = [...prev];
            newOutput[lastIndex] = currentLine;
            return newOutput;
          }
          return prev;
        });

        const isAsciiArt =
          line.includes("|") ||
          line.includes("\\") ||
          line.includes("/") ||
          line.includes("_");
        await new Promise((resolve) =>
          setTimeout(resolve, isAsciiArt ? 1 : 20),
        );
      }

      if (i < lines.length - 1) {
        setOutput((prev) => {
          const lastLine = prev[prev.length - 1];
          if (lastLine !== "") {
            return [...prev, ""];
          }
          return prev;
        });
      }
    }

    setIsTyping(false);
  }, []);

  // Define commands
  const helpCommand = useCallback(async () => {
    const commandDescriptions = [
      `help - ${profileCopy["terminal.help.desc"]}`,
      `whoami - ${profileCopy["terminal.whoami.desc"]}`,
      `clear - ${profileCopy["terminal.clear.desc"]}`,
      `skills - ${profileCopy["terminal.skills.desc"]}`,
      `history - ${profileCopy["terminal.history.desc"]}
            `,
    ];
    return commandDescriptions.join("\n");
  }, []);

  const whoamiCommand = useCallback(async () => {
    return asciiArt + getPersonalInfo();
  }, [asciiArt, getPersonalInfo]);

  const clearCommand = useCallback(async () => {
    setOutput([]);
    return "";
  }, []);

  const skillsCommand = useCallback(async () => {
    return `
├── ${profileCopy["skills.backend"]}
│   ├── Java
│   ├── Spring/Spring Boot
│   ├── MySQL, PostgreSQL
│   ├── Redis
│   └── MyBatis, JPA
│
└── ${profileCopy["skills.infrastructure"]}
    ├── AWS
    ├── Docker/Docker Compose
    ├── Kubernetes
    └── CI/CD
        ├── Jenkins
        ├── GitHub Actions
        └── Argo CD
      
`;
  }, []);

  const historyCommand = useCallback(async () => {
    return `
${profileCopy["terminal.recent.activity"]}
${projects
  .filter((project) => project.status !== "completed")
  .map((project) => `- ${project.period}: ${project.name}`)
  .join("\n")}
${profileCopy["terminal.activity.2"]}
- 2023.07 ~ 2024.12: [티맥스비아이] FOCUS 서비스 - 가격 정책, 재고 모듈 설계 및 구현
${projects
  .filter((project) => project.status === "completed")
  .map((project) => `- ${project.period}: ${project.name}`)
  .join("\n")}
- 2022.01 ~ 2022.12: 삼성청년SW아카데미 교육
      
`;
  }, []);

  // Execute command
  const executeCommand = useCallback(
    async (cmd: string) => {
      const trimmedCmd = cmd.trim();

      if (trimmedCmd === "") return;

      setOutput((prev) => [...prev, `> ${trimmedCmd}`, ""]);

      const commandName = trimmedCmd.split(" ")[0];

      let result = "";
      switch (commandName) {
        case "help":
          result = await helpCommand();
          break;
        case "whoami":
          result = await whoamiCommand();
          break;
        case "clear":
          await clearCommand();
          return;
        case "skills":
          result = await skillsCommand();
          break;
        case "history":
          result = await historyCommand();
          break;
        default:
          result = profileCopy["terminal.unknown.command"];
      }

      await typeWriter(result);

      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    },
    [
      helpCommand,
      whoamiCommand,
      clearCommand,
      skillsCommand,
      historyCommand,
      typeWriter,
    ],
  );

  // Handle key navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const newIndex =
        commandIndex >= availableCommands.length - 1 ? 0 : commandIndex + 1;
      setCommandIndex(newIndex);
      setInput(availableCommands[newIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (commandIndex <= 0) {
        const newIndex = availableCommands.length - 1;
        setCommandIndex(newIndex);
        setInput(availableCommands[newIndex]);
      } else {
        const newIndex = commandIndex - 1;
        setCommandIndex(newIndex);
        setInput(availableCommands[newIndex]);
      }
    }
  };

  // Handle input submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isTyping) return;

    executeCommand(input);
    setInput("");
    setCommandIndex(-1);
  };

  // Focus input when clicking on terminal
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Auto-execute 'whoami' command on load
  useEffect(() => {
    if (output.length === 0 && !hasExecutedRef.current) {
      hasExecutedRef.current = true;
      executeCommand("whoami");
    }
  }, [output.length, executeCommand]);

  return (
    <div
      className="terminal-container bg-[var(--background)] text-[var(--foreground)] p-4 h-full overflow-auto"
      onClick={focusInput}
      ref={terminalRef}
    >
      <div className="terminal-output font-mono whitespace-pre-wrap">
        {output.map((line, i) => (
          <div
            key={i}
            className={line.startsWith(">") ? "text-[var(--green)]  " : ""}
          >
            {line}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="terminal-input-form flex mt-2">
        <span className="text-[var(--green)] mr-2">{">"}</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent border-none outline-none flex-1 font-mono text-[var(--foreground)]"
          aria-label="터미널 명령 입력"
          placeholder={profileCopy["terminal.placeholder"]}
          disabled={isTyping}
        />
      </form>
    </div>
  );
}
