import isEqual from "lodash/isEqual";

export const getAllDirtyFields = <T extends Record<string, unknown>>({
  data,
  defaultValues,
}: {
  data: Partial<T>;
  defaultValues: T;
}): Partial<T> => {
  const dirtyFields: Partial<T> = {};
  for (const key in data) {
    if (!isEqual(data[key], defaultValues[key])) {
      dirtyFields[key] = data[key]!;
    }
  }

  return dirtyFields;
};
