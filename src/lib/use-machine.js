// @ts-check

/**
 * SigUI components runtime module for use machine.
 * @module
 */
import { createMachine } from "@sig-ui/core/machines";

/**
 * @template TDef
 * @template {Record<string, string | number | boolean | null | undefined | string[]>} [TContext=Record<string, string | number | boolean | null | undefined | string[]>]
 * @param {TDef} definition
 * @param {(state: string, context: TContext) => void} [onChange]
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
