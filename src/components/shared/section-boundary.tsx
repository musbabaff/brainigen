'use client';
import { Component, ReactNode } from 'react';

interface SectionBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  name?: string;
}

interface SectionBoundaryState {
  hasError: boolean;
}

export class SectionBoundary extends Component<SectionBoundaryProps, SectionBoundaryState> {
  state: SectionBoundaryState = { hasError: false };

  static getDerivedStateFromError(): SectionBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error(`[Section Error: ${this.props.name || 'unknown'}]`, error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}
