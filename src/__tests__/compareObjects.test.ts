import { expect, test } from 'vitest';

import { compareObjects } from '../app/lib/compareObjects';

test('Compare objects', () => {
    expect(
        compareObjects(
            {
                a: 1,
                b: 2
            },
            {
                b: 2,
                a: 1
            }
        )
    ).toBeTruthy();

    expect(
        compareObjects(
            {
                a: 1,
                b: 2
            },
            {
            }
        )
    ).toBeFalsy()

    expect(
        compareObjects(
            {
                a: 1,
                b: 2
            },
            {
                a: 1,
                b: 3
            }
        )
    ).toBeFalsy()
})
