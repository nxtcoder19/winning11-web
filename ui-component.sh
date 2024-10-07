#! /usr/bin/env bash

# Function to check if a component exists
component_exists() {
    local component_name="$1"
    if [ -f "components/ui/$component_name.jsx" ]; then
        return 0  # Component exists
    else
        return 1  # Component does not exist
    fi
}

# Add components only if they don't already exist
add_component() {
    local component_name="$1"
    if ! component_exists "$component_name"; then
        echo "Adding $component_name"
        npx shadcn@latest add "$component_name"
    else
        echo "$component_name already exists. Skipping."
    fi
}

mkdir -p src/components/ui

# Add components
add_component dialog
add_component alert-dialog
add_component button
add_component label
add_component sonner
add_component toast
add_component select
add_component dropdown-menu
add_component radio-group
add_component textarea