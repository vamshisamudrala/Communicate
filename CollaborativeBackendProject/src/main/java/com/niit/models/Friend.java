package com.niit.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="Friend")
public class Friend {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
private int friendid;
	@ManyToOne
private User fromid;
	@ManyToOne
private User toid;
public int getFriendid() {
		return friendid;
	}
	public void setFriendid(int friendid) {
		this.friendid = friendid;
	}
	public User getFromid() {
		return fromid;
	}
	public void setFromid(User fromid) {
		this.fromid = fromid;
	}
	public User getToid() {
		return toid;
	}
	public void setToid(User toid) {
		this.toid = toid;
	}
	public char getStatus() {
		return status;
	}
	public void setStatus(char status) {
		this.status = status;
	}
private char status;
}
