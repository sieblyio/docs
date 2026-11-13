// TypeDoc stores inline object members under a property's reflection type.
// getChildByName does not traverse that declaration on every TypeDoc version.
export function findDocumentedReflection(project, parts) {
  const direct = project.getChildByName(parts);
  if (direct) {
    return direct;
  }
  let current = project;
  for (let index = 0; index < parts.length; index += 1) {
    const members = [
      ...(current.children || []),
      ...(current.type?.declaration?.children || []),
    ];
    let next = members.find((child) => child.name === parts[index]);
    if (!next) {
      // Protocol operation names such as "account.status" contain literal dots.
      for (let end = parts.length; end > index + 1; end -= 1) {
        next = members.find(
          (child) => child.name === parts.slice(index, end).join('.'),
        );
        if (next) {
          index = end - 1;
          break;
        }
      }
    }
    if (!next) {
      const parameters = (current.signatures || []).flatMap((signature) =>
        (signature.parameters || []).filter(
          (parameter) => parameter.name === parts[index],
        ),
      );
      // An overloaded parameter needs explicit handling, not an arbitrary signature.
      next = parameters.length === 1 ? parameters[0] : undefined;
    }
    if (!next) {
      return undefined;
    }
    current = next;
  }
  return current;
}
