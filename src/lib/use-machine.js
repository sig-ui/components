// @ts-check

/**
 * SigUI components runtime module for use machine.
 * @module
 */
import { createMachine } from "@sig-ui/core/machines";

/**
 * @param {any} definition
 * @param {(state: string, context: any) => void} [onChange]
 */
export function useMachine(definition, onChange) {
  const machine = createMachine(definition);
  const unsubscribe = machine.subscribe((state, context) => {
    if (onChange) onChange(state, context);
  });
  return {
    machine,
    unsubscribe,
  };
}
