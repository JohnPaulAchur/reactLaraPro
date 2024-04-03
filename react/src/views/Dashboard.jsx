import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosClient from "../axios-client";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [counts, setCounts] = useState({
    usersCount: 0,
    messagesCount: 0,
    activeUsersCount: 0,
    pendingUsersCount: 0,
    todayUsersCount:0,
    todayMsgCount:0
  });

  useEffect(() => {
    getCounts();
  }, []);

  const getCounts = () => {
    setLoading(true);
    axiosClient
      .get("/dashboard-count") // Assuming this is the endpoint you expose in your Laravel backend
      .then((response) => {
        const { usersCount, messagesCount, activeUsersCount, pendingUsersCount } = response.data;
        setCounts({ usersCount, messagesCount, activeUsersCount, pendingUsersCount });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching counts:", error);
      });
  };

  return (
    <div>
      <div className="row">
        <div className="col-lg-3 col-md-6">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <div className="row">
                <div className="col-xs-3">
                  <i className="fa fa-users fa-4x"></i>
                </div>
                <div className="col-xs-9 text-right">
                  <div className="huge">{counts.usersCount?counts.usersCount:0}</div>
                  <div className="under-number">User</div>
                </div>
              </div>
            </div>
            <a href="#">
              <div className="panel-footer">
                <span className="pull-left blue">View Details</span>
                <span className="pull-right blue">
                  <i className="fa fa-arrow-circle-right"></i>
                </span>
                <div className="clearfix"></div>
              </div>
            </a>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
        <div className="panel panel-yellow">
            <div className="panel-heading">
                <div className="row">
                    <div className="col-xs-3">
                        <i className="fa fa-comment fa-4x"></i>
                    </div>
                    <div className="col-xs-9 text-right">
                        <div className='huge'>{counts.messagesCount?counts.messagesCount:0}</div>
                         <div className="under-number">Messages</div>
                    </div>
                </div>
            </div>
            <a href="#">
                <div className="panel-footer">
                    <span className="pull-left yellow">View Details</span>
                    <span className="pull-right yellow"><i className="fa fa-arrow-circle-right"></i></span>
                    <div className="clearfix"></div>
                </div>
            </a>
        </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="panel panel-green">
            <div className="panel-heading">
              <div className="row">
                <div className="col-xs-3">
                  <i className="fa fa-users fa-4x"></i>
                </div>
                <div className="col-xs-9 text-right">
                  <div className="huge">{counts.activeUsersCount}</div>
                  <div className="under-number">Active Users</div>
                </div>
              </div>
            </div>
            <a href="#">
              <div className="panel-footer">
                <span className="pull-left blue">View Details</span>
                <span className="pull-right blue">
                  <i className="fa fa-arrow-circle-right"></i>
                </span>
                <div className="clearfix"></div>
              </div>
            </a>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="panel panel-red">
            <div className="panel-heading">
              <div className="row">
                <div className="col-xs-3">
                  <i className="fa fa-users fa-4x"></i>
                </div>
                <div className="col-xs-9 text-right">
                  <div className="huge">{counts.pendingUsersCount}</div>
                  <div className="under-number">Pending Users</div>
                </div>
              </div>
            </div>
            <a href="#">
              <div className="panel-footer">
                <span className="pull-left blue">View Details</span>
                <span className="pull-right blue">
                  <i className="fa fa-arrow-circle-right"></i>
                </span>
                <div className="clearfix"></div>
              </div>
            </a>
          </div>
        </div>


        <div className="col-lg-3 col-md-6">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <div className="row">
                <div className="col-xs-3">
                  <i className="fa fa-users fa-4x"></i>
                </div>
                <div className="col-xs-9 text-right">
                  <div className="huge">+ {counts.todayUsersCount?counts.todayUsersCount:0} </div>
                  <div className="under-number">Registered today</div>
                </div>
              </div>
            </div>
            <a href="#">
              <div className="panel-footer">
                <span className="pull-left blue">View Details</span>
                <span className="pull-right blue">
                  <i className="fa fa-arrow-circle-right"></i>
                </span>
                <div className="clearfix"></div>
              </div>
            </a>
          </div>
        </div>
      <div className="col-lg-3 col-md-6">
        <div className="panel panel-yellow">
            <div className="panel-heading">
                <div className="row">
                    <div className="col-xs-3">
                        <i className="fa fa-comment fa-4x"></i>
                    </div>
                    <div className="col-xs-9 text-right">
                        <div className='huge'>+ {counts.todayMsgCount?counts.todayMsgCount:0}</div>
                         <div className="under-number">Messages Sent Today</div>
                    </div>
                </div>
            </div>
            <a href="#">
                <div className="panel-footer">
                    <span className="pull-left yellow">View Details</span>
                    <span className="pull-right yellow"><i className="fa fa-arrow-circle-right"></i></span>
                    <div className="clearfix"></div>
                </div>
            </a>
        </div>
        </div>
      </div>




    </div>
  );
}
