'use client';

import { useState } from 'react';

interface NavigationItem {
  key: string;
  label: string;
  href?: string;
  onClick?: () => void;
  isActive?: boolean;
  children?: NavigationItem[]; // Para submenus
  icon?: string; // Emoji ou símbolo
}

interface NavigationProps {
  items: NavigationItem[];
  variant?: 'horizontal' | 'vertical' | 'sidebar';
  className?: string;
  style?: React.CSSProperties;
  activeItemStyle?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
}

export function Navigation({
  items,
  variant = 'horizontal',
  className = '',
  style = {},
  activeItemStyle = {},
  itemStyle = {}
}: NavigationProps) {
  const [openSubmenus, setOpenSubmenus] = useState<Set<string>>(new Set());

  const toggleSubmenu = (key: string) => {
    const newOpenSubmenus = new Set(openSubmenus);
    if (newOpenSubmenus.has(key)) {
      newOpenSubmenus.delete(key);
    } else {
      newOpenSubmenus.add(key);
    }
    setOpenSubmenus(newOpenSubmenus);
  };

  const getDefaultStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      display: 'flex',
      listStyle: 'none',
      padding: 0,
      margin: 0,
      ...style
    };

    switch (variant) {
      case 'vertical':
        return {
          ...baseStyle,
          flexDirection: 'column',
          gap: '8px'
        };
      case 'sidebar':
        return {
          ...baseStyle,
          flexDirection: 'column',
          gap: '4px',
          padding: '16px',
          background: '#f8fafc',
          borderRadius: '8px',
          minWidth: '200px'
        };
      default: // horizontal
        return {
          ...baseStyle,
          gap: '20px',
          alignItems: 'center'
        };
    }
  };

  const getItemStyle = (item: NavigationItem): React.CSSProperties => {
    const baseItemStyle: React.CSSProperties = {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px',
      textDecoration: 'none',
      transition: 'all 0.2s',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      ...itemStyle
    };

    const variantStyles: Record<string, React.CSSProperties> = {
      horizontal: {
        padding: '8px 12px',
        borderRadius: '6px',
        color: item.isActive ? '#2563eb' : '#374151',
        fontWeight: item.isActive ? '600' : '500'
      },
      vertical: {
        padding: '10px 16px',
        borderRadius: '6px',
        color: item.isActive ? '#2563eb' : '#374151',
        fontWeight: item.isActive ? '600' : '500',
        width: '100%',
        justifyContent: 'flex-start'
      },
      sidebar: {
        padding: '12px 16px',
        borderRadius: '6px',
        color: item.isActive ? '#ffffff' : '#374151',
        fontWeight: item.isActive ? '600' : '500',
        background: item.isActive ? '#2563eb' : 'transparent',
        width: '100%',
        justifyContent: 'flex-start'
      }
    };

    return {
      ...baseItemStyle,
      ...variantStyles[variant],
      ...(item.isActive ? activeItemStyle : {})
    };
  };

  const getHoverStyle = (variant: string, isActive: boolean) => {
    if (isActive && variant === 'sidebar') return {};
    
    const hoverStyles: Record<string, React.CSSProperties> = {
      horizontal: { background: '#f3f4f6', color: '#111827' },
      vertical: { background: '#f3f4f6', color: '#111827' },
      sidebar: { background: '#e2e8f0' }
    };

    return hoverStyles[variant] || {};
  };

  const renderNavigationItem = (item: NavigationItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isSubmenuOpen = openSubmenus.has(item.key);
    const indentStyle = variant === 'sidebar' && depth > 0 ? { paddingLeft: `${16 + depth * 20}px` } : {};

    return (
      <li key={item.key} style={{ position: 'relative' }}>
        <button
          onClick={() => {
            if (hasChildren) {
              toggleSubmenu(item.key);
            } else {
              item.onClick?.();
            }
          }}
          style={{
            ...getItemStyle(item),
            ...indentStyle
          }}
          onMouseEnter={(e) => {
            const hoverStyle = getHoverStyle(variant, item.isActive || false);
            Object.assign(e.currentTarget.style, hoverStyle);
          }}
          onMouseLeave={(e) => {
            const originalStyle = getItemStyle(item);
            Object.assign(e.currentTarget.style, { ...originalStyle, ...indentStyle });
          }}
        >
          {item.icon && (
            <span style={{ fontSize: '18px' }}>{item.icon}</span>
          )}
          <span>{item.label}</span>
          
          {hasChildren && (
            <svg
              style={{
                width: '16px',
                height: '16px',
                marginLeft: 'auto',
                transform: isSubmenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s'
              }}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          )}
        </button>

        {/* Submenu */}
        {hasChildren && isSubmenuOpen && (
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: variant === 'horizontal' ? '8px 0 0 0' : '4px 0 0 0',
            position: variant === 'horizontal' ? 'absolute' : 'static',
            top: variant === 'horizontal' ? '100%' : 'auto',
            left: variant === 'horizontal' ? '0' : 'auto',
            background: variant === 'horizontal' ? 'white' : 'transparent',
            boxShadow: variant === 'horizontal' ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
            borderRadius: variant === 'horizontal' ? '6px' : '0',
            minWidth: variant === 'horizontal' ? '200px' : 'auto',
            zIndex: variant === 'horizontal' ? 100 : 'auto',
            border: variant === 'horizontal' ? '1px solid #e5e7eb' : 'none'
          }}>
            {item.children!.map(child => renderNavigationItem(child, depth + 1))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <nav className={className}>
      <ul style={getDefaultStyle()}>
        {items.map(item => renderNavigationItem(item))}
      </ul>
    </nav>
  );
}

// Componente de Breadcrumb (navegação hierárquica)
export function Breadcrumb({
  items,
  separator = '/',
  className = '',
  style = {}
}: {
  items: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
    isActive?: boolean;
  }>;
  separator?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <nav className={className} style={{ fontSize: '14px', ...style }} aria-label="Breadcrumb">
      <ol style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        listStyle: 'none',
        padding: 0,
        margin: 0
      }}>
        {items.map((item, index) => (
          <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {index > 0 && (
              <span style={{ color: '#9ca3af', fontSize: '12px' }}>
                {separator}
              </span>
            )}
            
            {item.isActive ? (
              <span style={{
                color: '#374151',
                fontWeight: '600'
              }}>
                {item.label}
              </span>
            ) : (
              <button
                onClick={item.onClick}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#6b7280',
                  cursor: 'pointer',
                  fontSize: '14px',
                  textDecoration: 'underline',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#374151';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#6b7280';
                }}
              >
                {item.label}
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Menu de Contexto (clique direito)
export function ContextMenu({
  items,
  isVisible,
  position,
  onClose,
  className = '',
  style = {}
}: {
  items: NavigationItem[];
  isVisible: boolean;
  position: { x: number; y: number };
  onClose: () => void;
  className?: string;
  style?: React.CSSProperties;
}) {
  if (!isVisible) return null;

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: position.y,
          left: position.x,
          background: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '6px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          zIndex: 1000,
          minWidth: '150px',
          ...style
        }}
        className={className}
      >
        <ul style={{
          listStyle: 'none',
          padding: '4px',
          margin: 0
        }}>
          {items.map(item => (
            <li key={item.key}>
              <button
                onClick={() => {
                  item.onClick?.();
                  onClose();
                }}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  padding: '8px 12px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#374151',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f3f4f6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'none';
                }}
              >
                {item.icon && <span>{item.icon}</span>}
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Overlay para fechar o menu */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999
        }}
        onClick={onClose}
      />
    </>
  );
}