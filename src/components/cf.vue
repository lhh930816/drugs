<template>
    <div class="tab-content" ref='content'>
            	<div class="tab-pane" id="tabPres1">
				    <el-table
				      	:data="tableData"
								border
								stripe
								ref='tables'>
				      	<el-table-column
				        	label="操作"
									align='center'
									width='80px'>
									<template slot-scope='scope'>
										<el-button class="delete" @click='del(scope.$index)' type='danger' size="mini" ><i class="el-icon-delete"></i></el-button>
										<el-button class="Add" @click="btnAdd(scope.$index)"  size="mini"><i class="el-icon-plus"></i></el-button>
									</template>
				      	</el-table-column>
				      	<el-table-column
								align='center'
								type='selection'
								width='50px'>
				      	</el-table-column>
								<el-table-column
								label='成组'
								align='center'>
								</el-table-column>
				      	<el-table-column
				        	label="大类"
									align='center'
									prop='val'
									width='100px'>
									<template slot-scope='scope' style='height:25px;'>
										<ComboBox v-model="scope.row.val"
										:data="opts" style='width: 80px; height: 25px;'
											@filterChange="onFilterChange($event)"
										@keyup.enter.native='show($event,scope.$index)'>
										</ComboBox>
									</template>	
				      	</el-table-column>
				      	<el-table-column
				      		label='名称'
									align='center'
									width='150px'>
									<template slot-scope='scope'>
										<ComboGrid
										valueField="itemid" 
										textField="name" 
										:hasDownArrow="false"
										v-model="scope.row.value"
										:data="data"
										style='width:130px; height:25px'
										:panelStyle="{width:'500px'}"
										:editable="true"
										v-on:keyup.enter.native='show($event,scope.$index)'>
											<DataGrid slot="grid" :border="false">
												<GridColumn field="itemid" title="Item ID"></GridColumn>
												<GridColumn field="name" title="Name"></GridColumn>
												<GridColumn field="listprice" title="List Price" align="right"></GridColumn>
												<GridColumn field="unitcost" title="Unit Cost" align="right"></GridColumn>
												<GridColumn field="attr" title="Attribute" width="30%"></GridColumn>
												<GridColumn field="status" title="Status" align="center"></GridColumn>
											</DataGrid>
										</ComboGrid>
									</template>
				      	</el-table-column>
				      	<el-table-column
				      		label="规格"
									align='center'
									width='100px'>
				      	</el-table-column>
				      	 <el-table-column
				      		label="单位"
									align='center'
									width='80px'>
				      	</el-table-column>
				       	<el-table-column
				      		label="单次用量"
									align='center'
									prop= 'consumption'
									width='80px'>
							<template slot-scope='scope'>
								<numberBox
									style='width:50px;
									text-align:center; height: 25px;'
									inputId="consumption" :disabled="bols"
									:precision="0" :spinners="false"
									@keyup.enter.native="show($event,scope.$index)"
									v-model="tableData[scope.$index].consumption">
								</numberBox>
							</template>	
				      	</el-table-column>
				      	<el-table-column
				      		label="用量单位"
							align='center'
							width='90px'>
				      	</el-table-column>
				      	<el-table-column
				      		label="频次"
							align='center'
							prop='pc'
							width='100px'>
							<template slot-scope='scope'>
								<ComboBox 
								inputId="fre"
								:disabled="bols"
								:data="frequency" style='width: 80px; height: 25px;'
								v-model="scope.row.pc"
								@keyup.native='show($event,scope.$index)'>
								</ComboBox>
							</template>	
				       </el-table-column>
				      <el-table-column
							label="途径"
							align='center'	
							prop='tj'
							width='100px'>
							<template slot-scope='scope'>
								<ComboBox 
								:data="opt" style='width: 80px; height: 25px;'
								v-model="scope.row.tj"
								inputId="channel" :disabled="bols"
								@filterChange="onFilterChange($event,scope._self.channel)"
								@keyup.native='show($event,scope.$index)'>
								</ComboBox>
							</template>	
				        </el-table-column>
					    <el-table-column
							label="天数"
							align='center'
							width='60px'>
					      	<template slot-scope='scope'>
									<numberBox
									style='width:40px; height: 25px;'
									:precision="0" :spinners="false"
									inputId='day' :disabled="bols"
									@keyup.enter.native="show($event,scope.$index)"
									v-model="scope.row.day">
									</numberBox>
							</template>	
					    </el-table-column>
						<el-table-column
							label="数量"
							align='center'
							width='60px'>
				      		<template slot-scope='scope'>
									<numberBox
									inputId='num'
									style='width:40px; height: 25px;'
									:precision="0" :spinners="false"
									@keyup.enter.native="show($event,scope.$index)"
									v-model="scope.row.num">
									</numberBox>
							</template>	
				        </el-table-column>
						<el-table-column
							label="单价"
							prop='price'
							align='center'
							width='60px'>
							</el-table-column>
							<el-table-column
							label="金额"
							prop='sum'
							align='center'
							width='60px'>
							</el-table-column>
							<el-table-column
							label="是否治疗"
							align='center'
							prop="val1"
							width='100px'>
							<template slot-scope='scope'>
								<ComboBox 
								:data="byo" style='width: 80px; height: 25px;'
								@keyup.enter.native="show($event,scope.$index)"
								v-model="scope.row.val1">
								</ComboBox>
							</template>
							</el-table-column>
							<el-table-column
							label="是否自带药"
							align='center'
							prop='val2'
							width='100px'>
							<template slot-scope='scope'>
								<ComboBox 
								:data="byo" style='width: 80px; height: 25px;'
									@keyup.enter.native="show($event,scope.$index)"
								v-model="scope.row.val2">
								</ComboBox>
							</template>	
				        </el-table-column>
				    </el-table>
						</div>
           </div>
					 
</template>
<script>
    export default {
			props:["bols"],
			data () {
				return {
					tableData: [],
					ref:[],
					options:[],
					czy: [],
					frequency:[],
					channel:[],
					opt:[],
					opts: [],
					byo:[
						{
							value: 1,
							text: '是'
						},
						{
							value: 0,
							text: '否'
						}
					],		
				treatment:[{
							value:1,
							text: '是'
						},
						{
							value: 0,
							text: '否'
					}],
				data: [{
						code: "FI-SW-01",
						name: "Koi",
						unitcost: 10.0,
						status: "P",
						listprice: 36.5,
						attr: "Large",
						itemid: "EST-1"
					},
					{
						code: "K9-DL-01",
						name: "Dalmation",
						unitcost: 12.0,
						status: "P",
						listprice: 18.5,
						attr: "Spotted Adult Female",
						itemid: "EST-10"
					},
					{
						code: "RP-SN-01",
						name: "Rattlesnake",
						unitcost: 12.0,
						status: "P",
						listprice: 38.5,
						attr: "Venomless",
						itemid: "EST-11"
					},
					{
						code: "RP-SN-01",
						name: "Rattlesnake",
						unitcost: 12.0,
						status: "P",
						listprice: 26.5,
						attr: "Rattleless",
						itemid: "EST-12"
					},
					{
						code: "RP-LI-02",
						name: "Iguana",
						unitcost: 12.0,
						status: "P",
						listprice: 35.5,
						attr: "Green Adult",
						itemid: "EST-13"
					},
					{
						code: "FL-DSH-01",
						name: "Manx",
						unitcost: 12.0,
						status: "P",
						listprice: 158.5,
						attr: "Tailless",
						itemid: "EST-14"
					},
					{
						code: "FL-DSH-01",
						name: "Manx",
						unitcost: 12.0,
						status: "P",
						listprice: 83.5,
						attr: "With tail",
						itemid: "EST-15"
					},
					{
						code: "FL-DLH-02",
						name: "Persian",
						unitcost: 12.0,
						status: "P",
						listprice: 23.5,
						attr: "Adult Female",
						itemid: "EST-16"
						},
						{
							code: "FL-DLH-02",
							name: "Persian",
							unitcost: 12.0,
							status: "P",
							listprice: 89.5,
							attr: "Adult Male",
							itemid: "EST-17"
						},
						{
							code: "AV-CB-01",
							name: "Amazon Parrot",
							unitcost: 92.0,
							status: "P",
							listprice: 63.5,
							attr: "Adult Male",
							itemid: "EST-18"
						}],
							}
				},
				created () {
					this.init();
					this.selectInit();
				},
				mounted() {
					this.$emit("group",{tableData:this.tableData,ref:this.$refs.tables}); //通过$emit传值给父组件
				},
				methods: {
					//下拉框初始化
					selectInit () {
						let that = this;
						that.$axios.get('./static/dl.json').then((res) => {
							that.options = res.data.result.dl;
							that.czy = res.data.result.zcy;
							that.frequency = res.data.result.pc;
							that.channel = res.data.result.tj;
						}).catch((err) => {
							that.$message.error({
								message: err
							});
						});
					},
					//数据初始化
					init () {
						let data = {
							consumption: 0, //单次用量
							day: 1,    //天数
							num: 1,    //数量
							price: 0,  //单价
							sum: 0,		//金额
							val: '全部',
							val1: 0,
							val2: 0,
							tj: "全部",
							pc: "01",
							czbz:0
						};
						this.tableData.push(data);
					},
					//新增一行
					btnAdd (index){
						this.init();
				},
				//键盘事件
					show (e,index) { 
						var el = e.target;
						var tb = this.$refs.tables.$el;
						var tbs = $(tb).bind('.el-table__body-wrapper').bind('table');
						var tab = tbs.find('.textbox-text').index(el);
						var indexNext = tab + 1;
						if (e.keyCode == 13) {
							if ($(el).prop("id")!='num') {  //判断id是否为num
								tbs.find(".textbox-text:eq(" + indexNext + ")").focus().select();
							} else {
								var idx = index + 1;
								if (index == tbs.find("tbody tr").length-1) {
										this.btnAdd(index);
										this.$nextTick(() => { //异步执行
										tbs.find("tbody tr").eq(idx).find('td:eq(3) .textbox-text').focus().select();
										})
								} else {
									tbs.find("tbody tr").eq(idx).find('td:eq(3) .textbox-text').focus().select();	
								}
								
							}
						}
					},
					//删除一行
					del (index) {
						for (let i = 0; i<this.tableData.length; i++) {
							if (i == index) {
								if(this.tableData.length == 1) { //只有一行数据时初始化
									this.init();
								}
								this.tableData.splice(i,1);
							}
						}
					},
					//拼音检索
					onFilterChange (event) {
						const PinyinMatch = require('pinyin-match');
						let _opt = [];
						if (this.bols) {
							_opt = this.czy;
						}else {
							_opt = this.options;
						}
							if (event.filterValue) {
							let result = [];
							let res = [];
							_opt.forEach(i => {
								let m = PinyinMatch.match(i.text,event.filterValue);
								if (m) {
									result.push(i);
								}
							});
							this.channel.forEach(i => { //途径
								let _m = PinyinMatch.match(i.text,event.filterValue);
								if (_m) {
									res.push(i);
								}
							});
							this.opt = res;
							this.opts = result;
						}else{
							this.opts = _opt;
							this.opt = this.channel;
						}				
					}
				}
    }
</script>