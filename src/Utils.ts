import { NOTE_FREQUENCIES } from "./Constants";

/**
 * Returns a promise that resolves after the given delay.
 * @param delay The delay period in ms.
 */
export async function delay(delay: number): Promise<void> {
    return new Promise((resolve) => setTimeout(() => resolve(), delay));
}

export function parseFrequency(frequency: string | number): number {
    // Frequency may already be a number.
    if (typeof frequency === "number") {
        return frequency;
    }

    // Frequency may be a stringified number.
    const parsedFrequency = parseFloat(frequency);

    if (!isNaN(parsedFrequency)) {
        return parsedFrequency;
    }

    // Frequency may be a note name (e.g. A4 or Bb3) - try to look it up from the frequency hashmap.
    const noteFrequency = NOTE_FREQUENCIES[frequency];

    if (noteFrequency) {
        return noteFrequency;
    }

    throw new Error(`Unable to parse the frequency: ${frequency}`);
}