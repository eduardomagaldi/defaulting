import { useState, useEffect, useRef } from "react";

function App() {
  const [commands, setCommands] = useState(getCommands());
  const [copied, setCopied] = useState(false);
  const isFirstRender = useRef(true);

  function toggleCommand(index) {
    setCommands((prevCommands) =>
      prevCommands.map((cmd, i) =>
        i === index ? { ...cmd, selected: !cmd.selected } : cmd
      )
    );
  }

  // Auto-copy to clipboard whenever commands change (after initial render)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const selectedCommands = commands
      .filter((command) => command.selected)
      .map((command) => command.command)
      .join(" && ");
    navigator.clipboard.writeText(selectedCommands);
  }, [commands]);

  function copyAllCommands() {
    const selectedCommands = commands
      .filter((command) => command.selected)
      .map((command) => command.command)
      .join(" && ");
    navigator.clipboard.writeText(selectedCommands);

    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 5000);
  }

  function deselectAll() {
    setCommands((prevCommands) =>
      prevCommands.map((cmd) => ({ ...cmd, selected: false }))
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Defaulting-ing...</h1>
        <div className="flex gap-2">
          <button
            className="bg-red-500 text-white p-2 rounded-md"
            onClick={deselectAll}
          >
            Deselect all
          </button>
          <button
            className="bg-blue-500 text-white p-2 rounded-md"
            onClick={copyAllCommands}
          >
            {copied ? "Copied!" : "Copy all"}
          </button>
        </div>
      </div>
      <CommandList commands={commands} onToggle={toggleCommand} />
    </div>
  );
}

export default App;

function CommandList({ commands, onToggle }) {
  return commands.map((command, index) => (
    <label
      key={"command-" + index}
      className="flex gap-2 items-center mb-2"
      htmlFor={"command-" + index}
    >
      <input
        type="checkbox"
        className=""
        id={"command-" + index}
        checked={command.selected}
        onChange={() => onToggle(index)}
      />
      <pre className="text-sm bg-black text-white p-2 py-1 rounded-md">
        {command.command}
      </pre>
      <p>{command.description}</p>
    </label>
  ));
}

function getCommands() {
  const selectedObject = { selected: true };

  return [
    {
      command: "softwareupdate --install --all",
      description: "Update all macOS software",
      ...selectedObject,
    },
    {
      command: "defaults write -g com.apple.mouse.scaling 3",
      description: "Make trackpad/mouse as fast as possible (3x speed)",
      ...selectedObject,
    },
    {
      command: "defaults write com.apple.dock persistent-apps -array",
      description: "Remove all apps from the dock",
      ...selectedObject,
    },
    {
      command: "defaults write com.apple.dock autohide -bool true",
      description: "Auto hide the dock",
      ...selectedObject,
    },
    {
      command:
        "defaults write NSGlobalDomain AppleShowAllExtensions -bool true",
      description: "Show all extensions",
      ...selectedObject,
    },
    {
      command:
        'open "x-apple.systempreferences:com.apple.preference.universalaccess?Seeing_Display"',
      description:
        "Open System Settings to Accessibility > Display for cursor size",
      selected: false,
    },
    {
      command: "defaults write com.apple.dock wvous-br-corner -int 0",
      description: "Remove notes from the bottom right corner of the screen",
      ...selectedObject,
    },
    {
      command: 'defaults write com.apple.dock "mru-spaces" -bool "false"',
      description: "Disable most recently used spaces",
      ...selectedObject,
    },
    {
      command: "defaults -currentHost write com.apple.screensaver idleTime 0",
      description: "Set the screen saver idle time to 0",
      ...selectedObject,
    },
    {
      command:
        "defaults write com.apple.driver.AppleBluetoothMultitouch.trackpad TrackpadTwoFingerSwipeGesture -int 0",
      description: "Disable browser two finger swipe to go back and forward",
      ...selectedObject,
    },
    {
      command: "defaults write com.apple.finder AppleShowAllFiles -bool true",
      description: "Show all files in the finder",
      ...selectedObject,
    },
    {
      command: "git config --global --type bool push.autoSetupRemote true",
      description:
        "Automatically setup remote when pushing to a new repository",
      ...selectedObject,
    },
    {
      command:
        "defaults -currentHost write com.apple.controlcenter Sound -int 18",
      description: "Enable sound in the control center",
      ...selectedObject,
    },
    {
      command: "sudo nvram SystemAudioVolume=%80",
      description: "Set the system audio volume to 80%",
      ...selectedObject,
    },
    {
      command:
        '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"',
      description: "Install Homebrew",
      ...selectedObject,
    },
    {
      command: "brew install --cask middle",
      description: "Install Middle",
      ...selectedObject,
    },
    {
      command: "brew install --cask google-chrome",
      description: "Install Google Chrome",
      ...selectedObject,
    },
    {
      command: "brew install --cask nordpass",
      description: "Install Nordpass",
      ...selectedObject,
    },

    {
      command: "brew install --cask cursor",
      description: "Install Cursor",
      ...selectedObject,
    },

    {
      command: "brew install gh",
      description: "Install GitHub CLI",
      ...selectedObject,
    },

    {
      command: "gh auth login",
      description: "Login to GitHub",
      ...selectedObject,
    },

    {
      command: "brew install node",
      description: "Install Node.js",
      ...selectedObject,
    },

    {
      command: "killall Dock",
      description: "Restart the dock",
      ...selectedObject,
    },
    {
      command: "killall Finder",
      description: "Restart the finder",
      ...selectedObject,
    },
  ];
}

// open "x-apple.systempreferences:com.apple.preference.universalaccess?Seeing_Display"
