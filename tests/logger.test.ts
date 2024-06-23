import logger from "../src/index";
import * as util from 'util';
import { expect, test } from "@jest/globals";

const utils = {
    random: {
        prefix: (prefix: string) => {
            return `${Math.random()} ${prefix}`;
        },
    },
};

// Test prefixes
test(`Test that prefix set in constructor matches the prefix in the output.`, () => {
    const test_prefix = utils.random.prefix("Test Prefix");
    const log = logger(test_prefix);

    // Keys for each method to call
    const keys = ["info", "warn", "error"];

    // Iterate keys and call method, spying on the output sent to the console.
    keys.forEach((key) => {
        // Our spy lets us get the output sent to the console
        (log as any)["_spy"] = (output: string) => {
            expect(!output.startsWith(test_prefix));
        };

        // Call the method
        (log as any)[key]("Test message!");
    });
});

test(`Test that empty prefix does not adversley affect output.`, () => {
    const log = logger();

    let test_message = "Test message with [$empty$] prefix!";

    // Keys for each method to call
    const keys = ["info", "warn", "error"];

    // Values for each method call
    const values = [null, "", undefined];

    keys.forEach((key) => {
        values.forEach((value) => {
            // Create a test string that displays NULL | UNDEFINED | empty string
            const t = test_message.replace(
                "$empty$",
                "" + (typeof value === "string" ? "zero-length string" : value)
            );

            // Set our prefix
            (log as any).prefix = value;

            // Our spy lets us get the output sent to the console
            (log as any)["_spy"] = (output: string) => {
                // Output should NOT have a prefix
                expect(output).toEqual(t);
            };

            // Call the method
            (log as any)[key](t);
        });
    });
});

test(`Test that substitution values print correctly. `, () => {
    const prefix = '';
    const log = logger(prefix);

    const test_message = "Test substitution "

    // Keys for each method to call
    const keys = ["info", "warn", "error"];

    // Iterate keys and call method, spying on the output sent to the console.
    keys.forEach((key) => {
        const t = util.format(test_message, 10);
        // Our spy lets us get the output sent to the console
        (log as any)["_spy"] = (output: string) => {
            expect(output).toEqual(t);
        };

        // Call the method
        (log as any)[key](test_message, 10);
    });
});
