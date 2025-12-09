# BMad Method Steering Rules for Kiro

This project utilizes the **BMad Method** for AI-assisted development. This steering file guides Kiro on how to interact with the BMad agents, workflows, and structure.

## 1. Project Structure & Context

- **Agents**: The detailed persona and instruction files for agents are located in:
  - `.bmad/core/agents/` (Core agents like `bmad-master`)
  - `.bmad/bmm/agents/` (BMM specific agents like `analyst`, `architect`, `dev`, `pm`, etc.)
- **Workflows**: Defined workflows are located in:
  - `.bmad/core/workflows/`
  - `.bmad/bmm/workflows/`
- **Tasks**: Reusable task definitions in:
  - `.bmad/core/tasks/`
- **Tools**: Specialized tools in:
  - `.bmad/core/tools/`
- **Docs**: BMad documentation is in `.bmad/docs/`
- **Config**: Configuration files in `.bmad/_cfg/`
- **Output**: Project documentation outputs to `docs/` folder

## 2. Agent Activation

When the user references a BMad agent (e.g., "Analyst", "Architect", "Dev", "PM"), you must:

1.  **Locate the Agent File**: Find the corresponding XML file in `.bmad/bmm/agents/` or `.bmad/core/agents/`.
    - Example: If user asks for "Analyst", look for `.bmad/bmm/agents/analyst.xml`
    - Example: If user asks for "Dev", look for `.bmad/bmm/agents/dev.xml`
2.  **Read & Adopt Persona**: Read the content of that file. It contains the persona, responsibilities, and specific instructions for that agent. **You must fully embody this persona.**
3.  **Follow Instructions**: Execute the "Activation" steps or "System Instructions" defined within that agent file.
4.  **Use Agent Syntax**: Users can activate agents by saying:
    - "Act as BMad Analyst" or "Activate Analyst agent"
    - "I need the Dev agent" or "Switch to Dev mode"
    - "Run as Architect" or "Be the Architect"

## 3. Workflow Execution

When the user asks to run a workflow (e.g., "Document Project", "Sprint Planning", "Create Story"):

1.  **Locate Workflow**: Find the matching workflow file in `.bmad/bmm/workflows/` or `.bmad/core/workflows/`
    - Workflows are organized by phase (e.g., `1-analysis/`, `2-design/`, `3-implementation/`)
    - Example: "Document Project" → `.bmad/bmm/workflows/5-documentation/document-project/workflow.yaml`
2.  **Read Workflow Definition**: Load the `workflow.yaml` file which contains:
    - Workflow metadata (name, description, author)
    - Agent assignments
    - Step-by-step instructions
    - Input/output specifications
3.  **Execute Steps**: Follow the steps outlined in the workflow file sequentially
4.  **Check Dependencies**: Some workflows may reference other workflows or require specific files

## 4. Available Workflows by Phase

### Phase 1: Analysis
- `brainstorm-project` - Initial project ideation
- `domain-research` - Research domain and market
- `product-brief` - Create product brief
- `research` - General research workflow
- `prd` - Create Product Requirements Document

### Phase 2: Design
- `create-ux-design` - UX design workflow
- `tech-spec` - Technical specification
- `architecture` - System architecture design
- `create-excalidraw-*` - Various diagram creation workflows

### Phase 3: Implementation
- `create-epics-and-stories` - Break down work into epics/stories
- `create-story` - Create individual user story
- `dev-story` - Develop a user story
- `story-ready` - Prepare story for development
- `story-done` - Mark story as complete
- `sprint-planning` - Plan sprint
- `code-review` - Review code changes

### Phase 4: Quality
- `implementation-readiness` - Check if ready for implementation
- `correct-course` - Course correction workflow

### Phase 5: Documentation
- `document-project` - Generate comprehensive project documentation

## 5. General BMad Rules

- **Context Awareness**: Be aware that this is a BMad project. Respect the roles and boundaries of different agents.
- **File Editing**: When acting as a `Dev` or `Architect`, follow the coding standards and architectural guidelines defined in the project (often found in `docs/` or implied by the framework).
- **Status Tracking**: Check `docs/bmm-workflow-status.yaml` to understand the current state of the project.
- **Language Settings**: 
  - Communication language: Persian (as configured in `.bmad/core/config.yaml`)
  - Document output language: English (as configured)
- **Output Location**: All documentation outputs go to `docs/` folder (configurable in config.yaml)

## 6. Quick Reference for Agents

### Core Module
- **BMad Master**: Orchestrator, helper for BMad usage, guides users through the method

### BMM Module (Brownfield Method Management)
- **Analyst**: Requirements gathering, PRD creation, user research
- **Architect**: System design, technical specifications, architecture decisions
- **Dev**: Implementation, coding, testing, code reviews
- **PM**: Project management, sprint planning, backlog management
- **SM**: Scrum Master, facilitates agile processes, removes blockers
- **Tech Writer**: Documentation, user guides, API docs
- **UX Designer**: User experience, wireframes, prototypes, user flows
- **TEA**: Test Engineering Automation, test strategy, automation

## 7. How to Use in Kiro

Since Kiro doesn't have native BMad integration yet, use these patterns:

### Pattern 1: Direct Agent Activation
```
"Act as the BMad Dev agent and help me implement feature X"
"Switch to Analyst mode and create a PRD for Y"
```

### Pattern 2: Workflow Execution
```
"Run the document-project workflow"
"Execute the dev-story workflow for story #123"
```

### Pattern 3: Reference Files
```
"Read the Dev agent definition and help me with this task"
"Follow the sprint-planning workflow"
```

### Pattern 4: Use with Context
```
"As the Architect agent, review #File app/components/TopNav.vue"
"Acting as Tech Writer, document #Folder app/components/"
```

## 8. Tips for Best Results

1. **Be Explicit**: Clearly state which agent or workflow you want to use
2. **Provide Context**: Share relevant files, folders, or documentation
3. **Follow Phases**: BMad works best when following the natural flow: Analysis → Design → Implementation → Quality → Documentation
4. **Check Status**: Review `docs/bmm-workflow-status.yaml` to see what's been completed
5. **Iterate**: BMad is designed for iterative development - don't try to do everything at once

## 9. Configuration

- **User**: mahdi
- **BMad Version**: 6.0.0-alpha.12
- **Installed Modules**: core, bmm
- **Configured IDEs**: codex, cursor, antigravity, roo
- **Note**: Kiro support is not yet officially available but can be used via steering files (this file)
