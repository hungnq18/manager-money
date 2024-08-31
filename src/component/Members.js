import React, { useContext, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import GroupContext from '../context/GroupContext';
import { UserContext } from '../context/UserContext';

function Members() {
  const { groupId } = useParams();
  const { currentGroup, fetchGroupById, groupMembers, getGroupMembers } = useContext(GroupContext);
  const { users, getUsers } = useContext(UserContext);
  // Fetch users and group data on component mount
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    fetchGroupById(groupId);
  }, [fetchGroupById, groupId]);
  // Lấy thông tin chi tiết của từng thành viên từ `users` dựa trên `userId`
  const memberDetails = useMemo(() => {
    if (groupMembers || currentGroup.members) return [];
    return currentGroup.members.map(memberId => 
      users.find(user => user.id === memberId)
     
    ); 
  }, [currentGroup, users]);
console.log(memberDetails)
  return (
    <div>
    <h3>Members</h3>
    {
        memberDetails.length > 0 ? (
        memberDetails.map((member, index) => (
            <li key={index}>{member?.first}</li> // Check if member exists before accessing username
        ))
        ) : (
          <p>No members found.</p>
        )
      }
    </div>
  );
}

export default Members;

