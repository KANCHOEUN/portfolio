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
  const { t } = useLanguage()
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
    return `
${t("terminal.name")}
${t("terminal.role")}
      
${t("terminal.intro")}
${t("terminal.expertise")}
${t("terminal.beliefs")}
      
${t("terminal.current.work")}
${t("terminal.microservice.optimization")}
${t("terminal.performance.tuning")}
${t("terminal.opensource.contribution")}
      `
  }, [t])



  // Typewriter effect
  const typeWriter = useCallback(async (text: string) => {
    setIsTyping(true)
    const lines = text.split("\n")

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      let currentLine = ""

      for (let j = 0; j < line.length; j++) {
        currentLine += line[j]

        setOutput((prev) => {
          const lastIndex = prev.length - 1
          if (lastIndex >= 0 && prev[lastIndex] !== currentLine) {
            const newOutput = [...prev]
            newOutput[lastIndex] = currentLine
            return newOutput
          }
          return prev
        })

        const isAsciiArt = line.includes("|") || line.includes("\\") || line.includes("/") || line.includes("_")
        await new Promise((resolve) => setTimeout(resolve, isAsciiArt ? 1 : 20))
      }

      if (i < lines.length - 1) {
        setOutput((prev) => {
          const lastLine = prev[prev.length - 1]
          if (lastLine !== "") {
            return [...prev, ""]
          }
          return prev
        })
      }
    }

    setIsTyping(false)
  }, [])

  // Define commands
  const helpCommand = useCallback(async () => {
    const commandDescriptions = [
      `help - ${t("terminal.help.desc")}`,
      `whoami - ${t("terminal.whoami.desc")}`,
      `clear - ${t("terminal.clear.desc")}`,
      `skills - ${t("terminal.skills.desc")}`,
      `history - ${t("terminal.history.desc")}
            `,
    ]
    return commandDescriptions.join("\n")
  }, [t])

  const whoamiCommand = useCallback(async () => {
    return asciiArt + getPersonalInfo()
  }, [asciiArt, getPersonalInfo])

  const clearCommand = useCallback(async () => {
    setOutput([])
    return ""
  }, [])

  const skillsCommand = useCallback(async () => {
    return `
├── ${t("skills.backend")}
│   ├── Java
│   ├── Spring/Spring Boot
│   ├── MySQL
│   ├── Redis
│   └── MyBatis, JPA
│
└── ${t("skills.infrastructure")}
    ├── AWS
    ├── Docker/Docker Compose
    ├── Kubernetes
    └── CI/CD
        ├── Jenkins
        ├── GitHub Actions
        └── Argo CD
      
`
  }, [t])

  const historyCommand = useCallback(async () => {
    return `
${t("terminal.recent.activity")}
${t("terminal.activity.1")}
${t("terminal.activity.2")}
${t("terminal.activity.3")}
${t("terminal.activity.4")}
      
`
  }, [t])

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
          return
        case "skills":
          result = await skillsCommand()
          break
        case "history":
          result = await historyCommand()
          break
        default:
          result = t("terminal.unknown.command")
      }

      await typeWriter(result)

      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight
      }
    },
    [helpCommand, whoamiCommand, clearCommand, skillsCommand, historyCommand, t, typeWriter],
  )

  // Handle key navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      const newIndex = commandIndex >= availableCommands.length - 1 ? 0 : commandIndex + 1
      setCommandIndex(newIndex)
      setInput(availableCommands[newIndex])
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (commandIndex <= 0) {
        const newIndex = availableCommands.length - 1
        setCommandIndex(newIndex)
        setInput(availableCommands[newIndex])
      } else {
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
          placeholder={t("terminal.placeholder")}
          disabled={isTyping}
        />
      </form>
    </div>
  )
}
