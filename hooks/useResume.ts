
import { useState, useEffect, useCallback } from 'react';
import { Resume, ListSectionKey, Section } from '../types';
import { INITIAL_RESUME_DATA } from '../constants';

const LOCAL_STORAGE_KEY = 'ai-resume-builder-data';

export const useResume = () => {
  const [resume, setResume] = useState<Resume>(() => {
    try {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        // Ensure sectionOrder exists for resumes saved before this feature
        if (!parsed.sectionOrder) {
          parsed.sectionOrder = INITIAL_RESUME_DATA.sectionOrder;
        }
        return parsed;
      }
      return INITIAL_RESUME_DATA;
    } catch (error) {
      console.error('Error reading from localStorage', error);
      return INITIAL_RESUME_DATA;
    }
  });

  useEffect(() => {
    try {
      const debouncedSave = setTimeout(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(resume));
      }, 500);
      return () => clearTimeout(debouncedSave);
    } catch (error) {
      console.error('Error writing to localStorage', error);
    }
  }, [resume]);

  const updatePersonalInfo = useCallback((field: keyof Resume['personalInfo'], value: string) => {
    setResume(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [field]: value } }));
  }, []);
  
  const addListItem = useCallback(<T extends {id: string}>(section: ListSectionKey, newItem: T) => {
    setResume(prev => ({
      ...prev,
      [section]: [...(prev[section] as unknown as T[]), newItem]
    }));
  }, []);

  const updateListItem = useCallback(<T extends {id: string}>(section: ListSectionKey, updatedItem: T) => {
    setResume(prev => ({
      ...prev,
      [section]: (prev[section] as unknown as T[]).map(item => item.id === updatedItem.id ? updatedItem : item)
    }));
  }, []);
  
  const removeListItem = useCallback((section: ListSectionKey, id: string) => {
    setResume(prev => ({
      ...prev,
      [section]: (prev[section] as {id:string}[]).filter(item => item.id !== id)
    }));
  }, []);

  const updateSkills = useCallback((skills: string[]) => {
      setResume(prev => ({ ...prev, skills }));
  }, []);

  const updateProfiles = useCallback((profiles: string[]) => {
      setResume(prev => ({ ...prev, profiles }));
  }, []);

  const updateSectionOrder = useCallback((newOrder: Section[]) => {
    setResume(prev => ({ ...prev, sectionOrder: newOrder }));
  }, []);

  const toggleSectionVisibility = useCallback((section: Section) => {
    setResume(prev => {
      const isVisible = prev.sectionOrder.includes(section);
      const newSectionOrder = isVisible 
        ? prev.sectionOrder.filter(s => s !== section)
        : [...prev.sectionOrder, section];
      return { ...prev, sectionOrder: newSectionOrder };
    });
  }, []);


  return {
    resume,
    setResume, // Direct access for complex cases like AI update
    updatePersonalInfo,
    addListItem,
    updateListItem,
    removeListItem,
    updateSkills,
    updateProfiles,
    updateSectionOrder,
    toggleSectionVisibility,
  };
};
