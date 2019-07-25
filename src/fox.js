/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: wjc
 * @Date: 2019-07-18 10:48:32
 * @LastEditTime: 2019-07-25 10:45:06
 */
import React from "react";
// import { getPositionAttendanceStatistics } from '@/api';
// import styles from './index.module.less';
class PositionAttendanceStatistics extends React.Component {
  static defaultProps = {};

  static propTypes = {};

  constructor() {
    super();
    this.state = {
      data: [],
      animates: []
    };
  }
  componentDidMount() {
    this.getData();
    setTimeout(() => {
      this.getData2();
    }, 3 * 1000);
  }
  getData = () => {
    // const res = await getPositionAttendanceStatistics();
    // if (res && res.code === 'OK' && res) {

    // }
    const data = [
      {
        departmentName: "奉其奉生产", // 部门名称
        count: 120, // 打卡人数
        sum: 126 // 部门总人数
      },
      {
        departmentName: "奉其奉总务",
        count: 115,
        sum: 129
      },
      {
        departmentName: "浦卫路",
        count: 70,
        sum: 87
      },
      {
        departmentName: "科工路",
        count: 67,
        sum: 98
      }
    ];
    const sortedData = data.sort((a, b) => {
      return b.count / b.sum - a.count / a.sum;
    });
    this.setState({
      data: sortedData
    });
    console.log("oldData1", sortedData);
  };
  getData2 = () => {
    const data = [
      {
        departmentName: "奉其奉总务",
        count: 129,
        sum: 129
      },
      {
        departmentName: "奉其奉生产", // 部门名称
        count: 120, // 打卡人数
        sum: 126 // 部门总人数
      },

      {
        departmentName: "浦卫路",
        count: 70,
        sum: 87
      },
      {
        departmentName: "科工路",
        count: 97,
        sum: 98
      }
    ];
    const sortedData = data.sort((a, b) => {
      return b.count / b.sum - a.count / a.sum;
    });
    const update = [];
    const that = this;
    console.log("排序Data", sortedData);
    const lastData = this.state.data.slice();
    console.log("data111", lastData);
    for (let i = 0; i < sortedData.length; i++) {
      const newItem = sortedData[i];
      const oldIndex = lastData.findIndex(
        item => item.departmentName === newItem.departmentName
      );
      const oldItem = lastData[i];
      lastData[i] = newItem;
      lastData[oldIndex] = oldItem;
      console.log("lastData", lastData);
    }
    // sortedData.forEach((newItem, newIndex) => {
    //   const oldIndex = lastData.findIndex(
    //     item => item.departmentName === newItem.departmentName
    //   );
    //   const oldItem = lastData[newIndex];
    //   lastData[newIndex] = newItem;
    //   lastData[oldIndex] = oldItem;
    //   console.log("lastData", lastData);
    // });
  };
  update = (data, index) => {
    return setTimeout(() => {
      console.log("data", data, index);
    }, index * 1000);
  };
  render() {
    const { data, animates, top = 0 } = this.state;
    return (
      <div>1</div>
      // <div className={styles.case_wrapper}>
      //   <div className={styles.case_header}>
      //     <div className={styles.case_text}>
      //       <span className={styles.case_icon} />
      //       岗位出勤统计
      //     </div>
      //   </div>
      //   <div className={styles.itemsWrapper}>
      //     {data.map((item, index) => {
      //       return (
      //         <div
      //           className={styles.itemWrapper}
      //           style={{
      //             top: `${0.3 + index * 0.5 + top}rem`
      //           }}
      //           key={item.departmentName}
      //           ref={c => (this[item.departmentName] = c)}
      //         >
      //           <div className={styles.title}>
      //             <div className={styles.left}>
      //               {index + 1}.{item.departmentName}
      //             </div>
      //             <div className={styles.right}>
      //               {item.count}/{item.sum}
      //             </div>
      //           </div>
      //           <div className={styles.progressWrapper}>
      //             <div
      //               className={styles.progress}
      //               style={{
      //                 width: `${Math.round((item.count * 100) / item.sum)}%`
      //               }}
      //             />
      //           </div>
      //         </div>
      //       );
      //     })}
      //   </div>
      // </div>
    );
  }
}

export default PositionAttendanceStatistics;
