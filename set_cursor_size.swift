#!/usr/bin/env swift

import Cocoa
import AppKit

// Set cursor size (1.0 = default, 2.0 = 2x, etc.)
let cursorSize: Float = 1.0

// Use CFPreferences to set the cursor size
let key = "mouseDriverCursorSize"
let domain = "com.apple.universalaccess"

// Set the preference
CFPreferencesSetAppValue(key as CFString, NSNumber(value: cursorSize), domain as CFString)
CFPreferencesAppSynchronize(domain as CFString)

print("Cursor size set to \(cursorSize)")
print("Note: You may need to log out and back in, or restart your Mac for this to take effect.")

