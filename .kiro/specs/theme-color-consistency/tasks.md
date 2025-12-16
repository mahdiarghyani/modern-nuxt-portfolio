# Implementation Plan

- [x] 1. Update global CSS variables in main.css





  - Replace hardcoded purple/violet colors with primary color variables
  - Update scrollbar styling to use `--ui-color-primary-*` variables
  - Update utility classes (gradient-text, chip-base, hover-ring-tint, etc.)
  - Update heading gradient to use primary colors
  - _Requirements: 1.1, 2.1, 3.1, 3.2, 3.3, 5.1, 5.2, 6.1_

- [x] 2. Update Hero component





  - Replace hardcoded purple gradient in resume button with primary color variables
  - Verify chip-button styles use primary color variables (already implemented)
  - Test hover states on social buttons
  - _Requirements: 1.4, 4.2, 5.3_

- [x] 3. Update ProjectsList component





  - Replace hardcoded hover effects with primary color variables
  - Update card border colors to use primary variables
  - Update badge colors to use semantic primary classes
  - Update button hover states
  - _Requirements: 1.2, 4.1, 5.3_

- [x] 4. Update WorkExperience component






  - Replace hardcoded border-primary-500 with CSS variable
  - Update button colors to use semantic classes
  - Update icon colors to use primary variables
  - _Requirements: 1.2, 4.3, 5.3_

- [x] 5. Search and replace remaining hardcoded colors





  - Search codebase for `purple-`, `violet-`, `#a855f7`, `#9333ea`, `#7c3aed`
  - Replace any remaining instances with primary color variables
  - Check all Vue components, CSS files, and utility classes
  - _Requirements: 2.2, 5.1, 5.2_

- [x] 6. Update gradient backgrounds





  - Find all gradient backgrounds using purple/violet
  - Replace with primary color variable gradients
  - Ensure gradients work in both light and dark modes
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [x] 7. Add documentation comments






  - Add inline comments in main.css explaining CSS variable usage
  - Add style guide comment block at top of main.css
  - Document migration patterns for future development
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [x] 8. Test theme consistency across all colors

  - Test with green (default) primary color
  - Test with blue primary color
  - Test with red primary color
  - Test with orange primary color
  - Test with other available colors
  - Verify all elements update correctly
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 5.4_

- [x] 9. Test light and dark mode compatibility


  - Test all components in light mode with different primary colors
  - Test all components in dark mode with different primary colors
  - Verify scrollbar colors in both modes
  - Verify contrast ratios remain accessible
  - _Requirements: 3.4, 4.5, 6.3, 5.4_

- [x] 10. Final verification and cleanup

  - Run final search for any remaining purple/violet references
  - Verify no console errors or warnings
  - Test on Chrome, Firefox, and Safari
  - Test on mobile viewports
  - Ensure all tests pass, ask the user if questions arise
  - _Requirements: 5.5_
