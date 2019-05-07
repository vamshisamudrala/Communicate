package com.niit.daoimpl;

import javax.transaction.Transactional;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.niit.dao.ProfilePictureDao;
import com.niit.models.ProfilePicture;
@Repository
@Transactional
public class ProfilePictureDaoImpl implements ProfilePictureDao {
    @Autowired
	private SessionFactory sessionFactory;
	
	public void saveOrUpdateProfilePicture(ProfilePicture profilePicture) {
		Session s=sessionFactory.getCurrentSession();
		s.saveOrUpdate(profilePicture);
	}

	public ProfilePicture getProfilePicture(String email) {
		Session s=sessionFactory.getCurrentSession();
		ProfilePicture profilePicture=(ProfilePicture)s.get(ProfilePicture.class, email);
		return profilePicture;
	}

}
