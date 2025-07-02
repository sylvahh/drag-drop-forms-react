# App Components Documentation

This document provides an overview of key reusable components in the `components/app` directory. Each section describes the component's purpose, main props, and typical usage context.

---

## 1. `app-button`
A customizable button component supporting multiple visual variants, loading states, and optional icons. It wraps a native `<button>` and provides props for variant, loading indicator, left/right icons, and disables itself when loading.

**Main Props:**
- `variant`: Visual style (e.g., `primary`, `secondary`, `outline`, `destructive`, etc.)
- `isLoading`: Shows a loader and disables the button when true
- `loaderType`: Loader animation style (`bars`, `spinner`, etc.)
- `leftIcon` / `rightIcon`: Optional icons
- `disabled`: Disables the button

**Usage:**
Use for all interactive button needs, with consistent styling and loading feedback.

---

## 2. `container` (and variants)
A set of layout wrappers for page content, providing padding, width constraints, and error boundaries. Variants include `AppContainer`, `Minimum`, `Medium`, `Maximum`, and `AuthContainer` for authentication pages.

**Main Props:**
- `children`: Content to render inside
- `className`: Additional CSS classes
- `auth_link` (AuthContainer): Shows login/register link

**Usage:**
Use to wrap page or section content for consistent spacing and error handling. Choose a variant based on desired width or context (e.g., `AuthContainer` for login/register pages).

---

## 3. `render`
A utility component for handling loading, error, and success UI states in a single place. It displays a loading indicator, error message, or the children, wrapped in an error boundary.

**Main Props:**
- `isLoading`: Show loading UI
- `isError`: Show error UI
- `error`: Error object/message
- `loadingComponent`: Custom loading UI
- `errorComponent`: Custom error UI
- `children`: Main content

**Usage:**
Wrap content that may load asynchronously or error, to standardize state handling.

---

## 4. `empty-data`
Displays a friendly empty state with an illustration, title, and message when no data is available.

**Main Props:**
- `title`: Optional heading
- `text`: Optional message
- `icon`: Optional illustration
- `className`: Additional CSS classes

**Usage:**
Show when lists, tables, or sections have no data to display.

---

## 5. `app-dialog`
A modal dialog component built on top of a UI dialog library, supporting custom headers, footers, and content.

**Main Props:**
- `open`: Controls dialog visibility
- `onClose`: Callback for closing
- `title`, `description`: Header content
- `footer`: Footer content (e.g., actions)
- `children`: Main dialog content
- `containerClassName`, etc.: Custom styling

**Usage:**
Use for modal forms, confirmations, or any overlay content.

---

## 6. `app-dropdown`
A dropdown menu component with customizable trigger and content, supporting alignment, position, and modal behavior.

**Main Props:**
- `trigger`: Element to open the dropdown
- `children`: Dropdown content
- `position`, `align`: Placement options
- `modal`: Whether dropdown is modal
- `disabled`: Disables the trigger

**Usage:**
Use for menus, actions, or contextual options.

---

## 7. `pagination`
A simple pagination component for navigating paginated data, showing previous/next links and page numbers.

**Main Props:**
- Accepts a `PaginatedResponse` object with page info
- Renders navigation links based on available pages

**Usage:**
Place below lists or tables to allow users to navigate between pages of data.

---

For more details, refer to the source code of each component. 