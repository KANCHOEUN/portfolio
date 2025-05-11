"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { useLanguage } from "@/contexts/language-context"

interface Command {
  name: string
  description: string
  action: () => Promise<string>
}

export default function Terminal() {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [output, setOutput] = useState<string[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const { language, translations } = useLanguage()
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const hasExecutedRef = useRef(false)

  // Available commands array for navigation
  const availableCommands = ["whoami", "help", "skills", "history", "clear"]
  const [commandIndex, setCommandIndex] = useState(-1)

  // ASCII art for "Backend Developer"
  const asciiArt = `
 ___            _                _    ___                 _                         
| . > ___  ___ | |__ ___ ._ _  _| |  | . \\ ___  _ _  ___ | | ___  ___  ___  _ _     
| . \\<_> |/ | '| / // ._>| ' |/ . |  | | |/ ._>| | |/ ._>| |/ . \\| . \\/ ._>| '_>  _ 
|___/<___|\\_|_.|_\\_\\\\___.|_|_|\\___|  |___/\\___.|__/ \\___.|_|\\___/|  _/\\___.|_|   <_>
                                                                 |_|                
  `

  // Personal info
  const getPersonalInfo = useCallback(() => {
    return language === "en"
      ? `
Name: Hong Gil-dong
Role: Backend Developer

I'm a passionate backend developer focused on building robust and scalable systems.
My expertise includes Node.js, TypeScript, and cloud infrastructure.
I believe in clean code, thorough testing, and continuous learning.

Currently working on:
- Microservice architecture optimization
- Performance tuning for high-traffic applications
- Contributing to open source projects
      `
      : `
이름: 홍길동
직무: 백엔드 개발자

저는 견고하고 확장 가능한 시스템을 구축하는 데 집중하는 열정적인 백엔드 개발자입니다.
제 전문 분야는 Node.js, TypeScript 및 클라우드 인프라입니다.
저는 깨끗한 코드, 철저한 테스트 및 지속적인 학습을 믿습니다.

현재 작업 중:
- 마이크로서비스 아키텍처 최적화
- 고트래픽 애플리케이션을 위한 성능 튜닝
- 오픈 소스 프로젝트에 기여
      `
  }, [language])

  // Typewriter effect
  const typeWriter = useCallback(async (text: string) => {
    setIsTyping(true)
    const lines = text.split("\n")

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      let currentLine = ""

      for (let j = 0; j < line.length; j++) {
        currentLine += line[j]

        // 함수형 업데이트를 사용하되, 참조 복사를 최소화
        setOutput((prev) => {
          // 마지막 요소만 변경하므로 전체 배열을 복사할 필요 없음
          const lastIndex = prev.length - 1
          if (lastIndex >= 0 && prev[lastIndex] !== currentLine) {
            const newOutput = [...prev]
            newOutput[lastIndex] = currentLine
            return newOutput
          }
          return prev // 변경이 필요 없으면 이전 상태 그대로 반환
        })

        // Speed up ASCII art typing, slow down for regular text
        const isAsciiArt = line.includes("|") || line.includes("\\") || line.includes("/") || line.includes("_")
        // 상태 업데이트 후 약간의 지연을 줌
        await new Promise((resolve) => setTimeout(resolve, isAsciiArt ? 1 : 20))
      }

      if (i < lines.length - 1) {
        // 새 줄 추가 시 불필요한 리렌더링 방지
        setOutput((prev) => {
          const lastLine = prev[prev.length - 1]
          // 마지막 줄이 비어있지 않을 때만 새 줄 추가
          if (lastLine !== "") {
            return [...prev, ""]
          }
          return prev
        })
      }
    }

    setIsTyping(false)
  }, [])

  // Get placeholder text
  const getPlaceholderText = useCallback(() => {
    return language === "en"
      ? "Type 'help' for commands or use ↑↓ to navigate commands"
      : "'help' 입력하여 명령어 확인 또는 ↑↓ 키로 명령어 탐색"
  }, [language])

  // Define commands
  const helpCommand = useCallback(async () => {
    const commandDescriptions = [
      `help - ${translations[language].terminal.helpDesc}`,
      `whoami - ${translations[language].terminal.whoamiDesc}`,
      `clear - ${translations[language].terminal.clearDesc}`,
      `skills - ${translations[language].terminal.skillsDesc}`,
      `history - ${translations[language].terminal.historyDesc}`,
    ]
    return commandDescriptions.join("\n")
  }, [language, translations])

  const whoamiCommand = useCallback(async () => {
    return asciiArt + getPersonalInfo()
  }, [asciiArt, getPersonalInfo])

  const clearCommand = useCallback(async () => {
    setOutput([])
    return ""
  }, [])

  const skillsCommand = useCallback(async () => {
    return language === "en"
      ? `
├── Backend
│   ├── Java
│   ├── Spring/Spring Boot
│   ├── MySQL
│   ├── Redis
│   └── MyBatis, JPA
│
└── Infrastructure
    ├── AWS
    ├── Docker/Docker Compose
    ├── Kubernetes
    └── CI/CD
        ├── Jenkins
        ├── GitHub Actions
        └── Argo CD
`
      : `
├── 백엔드
│   ├── Java
│   ├── Spring/Spring Boot
│   ├── MySQL
│   ├── Redis
│   └── MyBatis, JPA
│
└── 인프라
    ├── AWS
    ├── Docker/Docker Compose
    ├── Kubernetes
    └── CI/CD
        ├── Jenkins
        ├── GitHub Actions
        └── Argo CD
`
  }, [language])

  const historyCommand = useCallback(async () => {
    return language === "en"
      ? `
Recent Activity:
1. 2023-12 ~ Present: Working on microservice architecture optimization
2. 2023-06 ~ 2023-11: Developed high-performance API gateway
3. 2022-09 ~ 2023-05: Built scalable backend for e-commerce platform
4. 2022-01 ~ 2022-08: Implemented CI/CD pipeline for cloud deployment
`
      : `
최근 활동:
1. 2023-12 ~ 현재: 마이크로서비스 아키텍처 최적화 작업 중
2. 2023-06 ~ 2023-11: 고성능 API 게이트웨이 개발
3. 2022-09 ~ 2023-05: 전자상거래 플랫폼용 확장 가능한 백엔드 구축
4. 2022-01 ~ 2022-08: 클라우드 배포를 위한 CI/CD 파이프라인 구현
`
  }, [language])

  // Execute command
  const executeCommand = useCallback(
    async (cmd: string) => {
      const trimmedCmd = cmd.trim()

      if (trimmedCmd === "") return

      setHistory((prev) => [...prev, trimmedCmd])
      setOutput((prev) => [...prev, `> ${trimmedCmd}`, ""])

      const commandName = trimmedCmd.split(" ")[0]

      let result = ""
      switch (commandName) {
        case "help":
          result = await helpCommand()
          break
        case "whoami":
          result = await whoamiCommand()
          break
        case "clear":
          await clearCommand()
          return // clear 명령은 출력이 없으므로 여기서 종료
        case "skills":
          result = await skillsCommand()
          break
        case "history":
          result = await historyCommand()
          break
        default:
          result = translations[language].terminal.unknownCommand
      }

      await typeWriter(result)

      // Scroll to bottom
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight
      }
    },
    [helpCommand, whoamiCommand, clearCommand, skillsCommand, historyCommand, language, translations, typeWriter],
  )

  // Handle key navigation - cycle through available commands
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()

      // Cycle through available commands
      const newIndex = commandIndex >= availableCommands.length - 1 ? 0 : commandIndex + 1
      setCommandIndex(newIndex)
      setInput(availableCommands[newIndex])
    } else if (e.key === "ArrowDown") {
      e.preventDefault()

      if (commandIndex <= 0) {
        // If at the beginning or not navigating, go to the end
        const newIndex = availableCommands.length - 1
        setCommandIndex(newIndex)
        setInput(availableCommands[newIndex])
      } else {
        // Otherwise go to previous command
        const newIndex = commandIndex - 1
        setCommandIndex(newIndex)
        setInput(availableCommands[newIndex])
      }
    }
  }

  // Handle input submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isTyping) return

    if (input.trim() !== "") {
      setCommandHistory((prev) => [...prev, input.trim()])
    }

    executeCommand(input)
    setInput("")
    setCommandIndex(-1)
  }

  // Focus input when clicking on terminal
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  // Auto-execute 'whoami' command on load
  useEffect(() => {
    if (output.length === 0 && !hasExecutedRef.current) {
      hasExecutedRef.current = true
      executeCommand("whoami")
    }
  }, [output.length, executeCommand])

  return (
    <div
      className="terminal-container bg-[#282c34] dark:bg-[#282c34] light:bg-[#fafafa] text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42] p-4 h-full overflow-auto"
      onClick={focusInput}
      ref={terminalRef}
    >
      <div className="terminal-output font-mono whitespace-pre-wrap">
        {output.map((line, i) => (
          <div
            key={i}
            className={line.startsWith(">") ? "text-[#98c379] dark:text-[#98c379] light:text-[#50a14f]" : ""}
          >
            {line}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="terminal-input-form flex mt-2">
        <span className="text-[#98c379] dark:text-[#98c379] light:text-[#50a14f] mr-2">{">"}</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent border-none outline-none flex-1 font-mono text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42]"
          placeholder={getPlaceholderText()}
          disabled={isTyping}
        />
      </form>
    </div>
  )
}
