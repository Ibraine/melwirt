import courses from "../data/courseData";

export const slugify = (value) =>
  value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const allSubCourses = courses.flatMap((mainCourse) => mainCourse.subcources || []);

export const getCourseSlug = (course) => {
  const baseSlug = slugify(course.title);
  const matchingTitles = allSubCourses.filter(
    (item) => slugify(item.title) === baseSlug
  );
  const matchingIndex = allSubCourses.indexOf(course);

  return matchingTitles.length > 1
    ? `${baseSlug}-${course.id}-${matchingIndex + 1}`
    : baseSlug;
};

export const getCourseEntries = () =>
  courses.flatMap((mainCourse) =>
    (mainCourse.subcources || []).map((course) => ({
      course,
      mainCourse,
      slug: getCourseSlug(course),
    }))
  );

export const findCourseBySlug = (courseSlug) =>
  getCourseEntries().find((entry) => entry.slug === courseSlug);

export const findCourseByLegacyRoute = (category, courseId) => {
  const categoryHeaders = {
    python: "Python Programming",
    robotics: "Robotics Programming",
    speaking: "Speaking",
  };
  const mainCourse = courses.find(
    (item) => item.header === categoryHeaders[category]
  );
  const course = mainCourse?.subcources?.find(
    (item) => item.id === Number(courseId)
  );

  return course ? { course, mainCourse, slug: getCourseSlug(course) } : null;
};
