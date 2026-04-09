import { existsSync, renameSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const rootDir = process.cwd();
const studioDir = path.join(rootDir, "app", "(studio)");
const tempStudioDir = path.join(rootDir, "app", "__studio_disabled");

const wasMoved = existsSync(studioDir);

if (wasMoved) {
  if (existsSync(tempStudioDir)) {
    throw new Error("Temporary studio directory already exists: app/__studio_disabled");
  }
  renameSync(studioDir, tempStudioDir);
}

try {
  const args = process.argv.slice(2);
  const result = spawnSync(
    "npx",
    ["next", "build", ...args],
    {
      stdio: "inherit",
      env: {
        ...process.env,
        ENABLE_STUDIO: "false",
      },
    }
  );

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
} finally {
  if (wasMoved && existsSync(tempStudioDir)) {
    renameSync(tempStudioDir, studioDir);
  }
}
