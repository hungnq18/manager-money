import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);
  const [currentGroup, setCurrentGroup] = useState(null);

  useEffect(() => {
    // Lấy danh sách nhóm từ API khi component được mount
    axios.get('http://localhost:9999/groups')
      .then(response => setGroups(response.data))
      .catch(error => console.error('Error fetching groups:', error));
  }, []);

  const fetchGroupById = (groupId) => {
    // Lấy thông tin của nhóm cụ thể theo ID từ API
    const group = groups.find(g => g.id == groupId);
    if (group) {
      setCurrentGroup(group);
    } else {
      axios.get(`http://localhost:9999/groups/${groupId}`)
        .then(response => setCurrentGroup(response.data))
        .catch(error => console.error('Error fetching group by ID:', error));
    }
  };

  const addGroup = (group) => {
    axios.post('http://localhost:9999/groups', group)
      .then(response => setGroups([...groups, response.data]))
      .catch(error => console.error('Error adding group:', error));
  };

  const memberGroup = (groupId) => {
    axios.get(`http://localhost:9999/groups/${groupId}/members`)
      .then(response => setCurrentGroup({ ...currentGroup, members: response.data }))
      .catch(error => console.error('Error fetching members:', error));
  };

  return (
    <GroupContext.Provider value={{ groups, currentGroup, fetchGroupById, addGroup, memberGroup }}>
      {children}
    </GroupContext.Provider>
  );
};

// Xuất từng thành phần riêng biệt
export default GroupContext;
