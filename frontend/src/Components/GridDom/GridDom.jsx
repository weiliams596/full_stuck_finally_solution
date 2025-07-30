import React from "react";

/**
 * This is the GridDom component which is used to create a grid layout.
 * - col: number of columns in the grid(default is 4, max is 12)
 * - row: number of rows in the grid(default is 1, max is 12)
 * - gap: gap between the grid items(default is 20px)
 * - children: the content to be displayed in the grid
 */

export default function GridDom({ col = 4, row = 1, gap = "20px", children }) {
  return (
    <div
      className={`grid grid-cols-${
        typeof col === "number" ? col : "[" + col + "]"
      } grid-rows-${typeof row === "number" ? row : "[" + row + "]"} gap-${
        typeof gap === "number" ? gap : "[" + gap + "]"
      } w-ful h-full justify-center items-center`}>
      {children}
    </div>
  );
}
