import { useState, useEffect } from "react";
// import { Link } from 'react-router-dom'
// import type { ColumnsType } from 'antd/es/table';
import axios from "axios";
import { Table, Select } from "antd";
// import {EditOutlined, DownOutlined} from '@ant-design/icons'

const Zones = () => {
  const [zonesData, setZonesData] = useState([]);

  const items = [
    {
      value: "undefined",
      label: "undefined",
    },
    {
      value: "border",
      label: "border",
    },
    {
      value: "depot",
      label: "depot",
    },
    {
      value: "loading",
      label: "loading",
    },
    {
      value: "fuel stop",
      label: "fuel stop",
    },
    {
      value: "toll",
      label: "toll",
    },
    {
      value: "weigh bridge",
      label: "weigh bridge",
    },
  ];

  useEffect(() => {
    const getZonesData = async () => {
      const res = await axios.get("http://localhost:5001/zones");
      const data = res.data.zones;
      // console.log(data);
      setZonesData(data);
    };
    getZonesData();
  }, []);

  const columns = [
    // {
    //     title: 'ID',
    //     dataIndex: '_id',
    //     key: '_id'
    // },
    {
      title: "ZoneID",
      dataIndex: "zone",
      key: "zone",
    },
    {
      title: "ZoneName",
      dataIndex: "address",
      // defaultSortOrder: 'descend',
      // sorter: (a, b) => a.address - b.address,
      key: "address",
    },
    // {
    //   title: "Group",
    //   dataIndex: "groupName",
    //   key: "groupName",
    //   render: (record) => {
    //     return (
    //       <Dropdown menu={{ items }} trigger={["click"]}>
    //         <a
    //           href="_blank"
    //           type="text"
    //           onClick={(e) => {
    //             e.preventDefault();
    //             console.log(record)
    //           }}
    //         >
    //           {record}
    //           {/* <DownOutlined /> */}
    //         </a>
    //       </Dropdown>
    //     );
    //   },
    // },
    {
      title: "Group",
      dataIndex: "groupName",
      key: "groupName",
      render: (record, e) => {
        return (
          <Select defaultValue={record} style={{width: 120,}} bordered={false} options={items}
            showArrow={false} size='medium' onChange={(value) => {handleChange(e, value)}}>
          </Select>
        );
      },
    },
  ];

  const handleChange = async (e, value) => {
    setZonesData((prev) => {
      return prev.map((zone) => {
        if (zone._id === e._id) {
          let zone_id = e._id
          let url = `http://localhost:5001/zones/${zone_id}`
          zone.groupName = value
          axios.patch(url, zone)
            .then((res) => {
              return res
            })
            .catch((err) => {
              return err
            })
          return zone
        } else {
          return zone
        }
      })
    })
  }

  return (
    <section className="section">
      <h1>Zones</h1>
      {/* {(zonesData === 'undefined') ? (
                <h1>Loading...</h1>
            ) : (
                zonesData.map((zone) => (
                    <article key={zone._id} className=''>
                        <h1>{zone.address}</h1>
                        <Link to={`/zones/${zone._id}`}>Open</Link>
                    </article>
                ))
            )} */}
      <Table
        rowKey={(zonesData) => zonesData._id}
        dataSource={zonesData}
        columns={columns}
      ></Table>
    </section>
  );
};

export default Zones;
