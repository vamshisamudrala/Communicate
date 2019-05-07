package com.niit.daoimpl;

import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.niit.dao.FriendDao;
import com.niit.models.Friend;
import com.niit.models.User;

@Repository
@Transactional
public class FriendDaoImpl implements FriendDao {
@Autowired
	private SessionFactory sessionFactory;
	
	public List<User> getAllSuggestedUsers(String email) {
		Session s =sessionFactory.getCurrentSession();
		String queryString="select * from userdetails where email "
				+ "in "
				+ "(select email from userdetails where email!=:e3 "
				+ "minus "
				+ "(select fromid_email from friend where  toid_email=:e1 "
				+ "union "
				+ "select toid_email from friend where fromid_email=:e2))";
		SQLQuery query=s.createSQLQuery(queryString);
		query.setString("e1", email);
		query.setString("e2", email);
		query.setString("e3", email);
		query.addEntity(User.class);
		return query.list();
	}

	public void friendRequest(Friend friend)
	{
	Session session=sessionFactory.getCurrentSession();
	session.save(friend);
	}
	public List<Friend> pendingRequests(String email)
	{
	Session session=sessionFactory.getCurrentSession();
	Query query=session.createQuery("from Friend where toId_email=:email and status=:status");
	query.setString("email",email);
	query.setCharacter("status",'P');
	List<Friend> pendingRequests=query.list();
	return pendingRequests;
	}
	public void acceptFriendRequest(Friend friend)
	{
	Session session=sessionFactory.getCurrentSession();
	friend.setStatus('A');
	session.update(friend);
	}
	public void deleteFriendRequest(Friend friend)
	{
	Session session=sessionFactory.getCurrentSession();
	session.delete(friend);
	}
	public List<User> listOfFriends(String email)
	{

	Session session=sessionFactory.getCurrentSession();
	Query query1=session.createQuery("select f.fromid from Friend f where f.toid.email=:e1 and status='A'");
	query1.setString("e1",email);
	List<User> list1=query1.list();
	Query query2=session.createQuery("select f.toid from Friend f where f.fromid.email=:e2 and status='A'");
	query2.setString("e2",email);
	List<User> list2=query2.list();
	list1.addAll(list2);
	return list1;
	}
}
