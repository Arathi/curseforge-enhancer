import { useState } from "react";

type Option<ValueType> = {
  value: ValueType;
  text?: string;
  children?: React.ReactNode;
};

export type SelectDropdownProps<ValueType> = {
  title?: string;
  value: ValueType;
  options?: Option<ValueType>[];
  onChange?: (value: ValueType) => void;
};

function SelectDropdown<ValueType>({
  title, 
  value, 
  options = [], 
  onChange
}: SelectDropdownProps<ValueType>) {
  const [open, setOpen] = useState<boolean>(false);

  let spanTitle: React.ReactNode = null;
  if (title !== undefined) {
    spanTitle = <span>{title}</span>;
  }

  function getOptionChildren(option: Option<ValueType>): React.ReactNode {
    if (option.children !== undefined) {
      return option.children;
    }
    if (option.text !== undefined) {
      return option.text;
    }
    return `${option.value}`;
  };

  let spanSelected: React.ReactNode = <span>请选择</span>;
  const selected = options.find(option => option.value === value);
  if (selected !== undefined) {
    spanSelected = <span>{getOptionChildren(selected)}</span>;
  }

  const items: React.ReactNode[] = [];
  options.forEach(option => {
    let children = getOptionChildren(option);
    items.push(
      <li 
        key={`item-${option.value}`} 
        className={option.value === value ? 'is-active' : ''}
        onClick={e => {
          if (onChange !== undefined) {
            onChange(option.value);
          }
        }}
      >
        {children}
      </li>
    );
  });

  const dropdownClasses = ['dropdown'];
  if (open) {
    dropdownClasses.push('is-open');
  }

  return (
    <div className="select-dropdown">
      { spanTitle }
      <div className={dropdownClasses.join(' ')} onClick={e => {
        setOpen(!open);
      }}>
        <p className="dropdown-selected-item">
          { spanSelected }
          <svg>
            <use href="/images/sprite.svg#arrow"></use>
          </svg>
        </p>
        
        <div className="dropdown-list-wrapper">
          <ul className="dropdown-list">
            { items }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SelectDropdown;
