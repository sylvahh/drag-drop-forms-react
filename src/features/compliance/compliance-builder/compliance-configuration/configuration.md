Field settings:

1. Text:
    - label, placeholder, required, description, max_length, min_length hint_text,
2. Email:
    - label, placeholder, required, description, hint_text,
3. Radio:
    - label, required, description, options[] hint_text,
4. Checkbox:
    - label, required, description, options[] hint_text,
5. Dropdown:
    - label, placeholder, required, description, multi_select, options[] hint_text,
6. File Upload:
    - label, placeholder, required, description, hint_text, file_types, max_file_size,
7. Date:
    - label, placeholder, required, description, date_type, date_format, hint_text,
8. Number:
    - label, placeholder, required, description, min_value, max_value, step, hint_text,
9. URL:
    - label, placeholder, required, description, hint_text,
10. Tel:
    - label, placeholder, required, description, hint_text,
11. Info Block:
    - content, info_type, hint_text,
12. Header:
    - text, hint_text,
13. Paragraph:
    - text, hint_text,


Structural settings:

1. Field rows:
    - layout: 1/2/3-column (default: 1-column)
2. Form Block:
    - title: string
    - description: string
3. Super Block:
    - title: string
    - description: string
    - max_entries: number
    - min_entries: number
    - summary_fields: Field[] // this is the fields that will be shown in the summary of the super block module (e.g. if the super block module is a list of products, the summary fields could be the product name, price, quantity, etc.)
4. Super Block Module:
    - title: string
5. Module:
    - title: string
    - description: string
6. Section:
    - title: string
    - description: string
7. Flow:
    - name: string
    - description: string