import React from 'react';
import cn from 'classnames';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import './styles.css';

interface Props {
  className?: string;
  onChange: (value: string) => void;
  value: string;
  placeholder?: string;
}

const defaultValue = `// Code here`;

const Code = ({ className, onChange, value, placeholder }: Props) => {
  return (
    <Editor
      value={value || defaultValue}
      placeholder={placeholder}
      onValueChange={e => {
        onChange(e);
      }}
      highlight={code => highlight(code, languages.js)}
      padding={10}
      className={cn('codeContainer', className)}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace'
      }}
    />
  );
};

export default Code;
