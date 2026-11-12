// The course list the site starts with. After the first load you add, edit and
// remove links on the Courses page itself, so this file is only the beginning.
//
// status: "todo" | "watching" | "done"
// stoppedAt: where you paused, like "1:02:30". The Continue button jumps there.

export const seedCourses = [
  {
    id: "c-js",
    label: "JavaScript",
    title: "JavaScript Tutorial Full Course - Beginner to Pro",
    channel: "SuperSimpleDev",
    length: "about 22 hours",
    url: "https://www.youtube.com/watch?v=EerdGm-ehJQ",
  },
  {
    id: "c-backend",
    label: "Backend",
    title: "Backend Full Course | NodeJS ExpressJS PostgreSQL Prisma & Docker",
    channel: "Smoljames",
    length: "5 h 17 min",
    url: "https://www.youtube.com/watch?v=9BD9eK9VqXA",
  },
  {
    id: "c-mongo",
    label: "MongoDB",
    title: "",
    channel: "",
    length: "",
    url: "https://www.youtube.com/watch?v=c2M-rlkkT5o",
  },
  {
    id: "c-project",
    label: "First project",
    title: "",
    channel: "",
    length: "playlist",
    url: "https://www.youtube.com/watch?v=Ivsvcg36cnQ&list=PLhFBHuT4t3aCiG8KjDlgKubRMtwAQTi9I",
  },
  {
    id: "c-rn",
    label: "React Native",
    title: "React Native Full Course 2026 | Build, Publish and Monetize a Full Stack Mobile App to App Store",
    channel: "JavaScript Mastery",
    length: "about 3 h 40 min",
    url: "https://www.youtube.com/watch?v=4nVoLX2taFg",
  },
  {
    id: "c-nest",
    label: "NestJS",
    title: "NestJs Course for Beginners - Create a REST API",
    channel: "freeCodeCamp.org",
    length: "over 3 hours",
    url: "https://www.youtube.com/watch?v=GHTA143_b-s",
  },
  {
    id: "c-devops",
    label: "DevOps",
    title: "DevOps from Zero to Hero: Build and Deploy a Production API",
    channel: "JavaScript Mastery",
    length: "5 hours",
    url: "https://www.youtube.com/watch?v=H5FAxTBuNM8",
  },
].map((course) => ({ status: "todo", stoppedAt: "", notes: "", ...course }));
