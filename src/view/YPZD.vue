<template>
	<div>
    <Panel style="width:100%;" title="药品字典">
      <ButtonGroup style="float:left;">
        <LinkButton iconCls="icon-adds" @click="add">新增(F8)</LinkButton>
        <LinkButton iconCls="icon-mod" @click = "edit">修改(F9)</LinkButton>
				<LinkButton iconCls="icon-del" @click = "del">删除(F10)</LinkButton>
      </ButtonGroup>
      <div class="f-row" style="float:left;padding:5px 20px;">
          <SearchBox style="width:180px"
            placeholder="药品名称" 
            v-model="value"
            @search="onSearch($event)">
          <Addon>
            <span v-if="value" class="textbox-icon icon-clear" title="Clear value" @click="value=null"></span>
          </Addon>
        </SearchBox>
				</div>
      <DataGrid style=" clear:both;"
          :pagination="true"
          :lazy="true"
          :data="data"
          :total="total"
          :loading="loading"
          :pageNumber="pageNumber"
          :pageSize="pageSize"
          :pagePosition="pagePosition"
          :selectionMode = "selectionMode"
          @selectionChange="row=$event"
          @pageChange="onPageChange($event)">
          <GridColumn field="YPMC" title="药品名称" align="center"></GridColumn>
          <GridColumn field="YPLB" title="药品类别" align="center"></GridColumn>
          <GridColumn field="YPGG" title="规格" align="center"></GridColumn>
          <GridColumn field="CGPFJ" title="常规批发价" align="center"></GridColumn>
          <GridColumn field="CGLXJ" title="常规零售价" align="center"></GridColumn>
          <GridColumn field="BXLX" title="报销类型" align="center"></GridColumn>
          <GridColumn field="ZT" title="状态" align="center"></GridColumn>
      </DataGrid>
    </Panel>
    <Dialog ref="d1" 
      :title="title"
      :dialogStyle="{width:'900px',height:'612px'}"
      :modal="true"
      :draggable="true"
      :closed = "dialogClosed"
      @open = "onDialogOpen"
      @close="close"
      :resizable="true">
      <Form ref="user" :model="user" :rules="rules" @validate="errors=$event">
      <div style="marginp-bottom: 20px">
	        <ul class="formList">
		          <li>
		            <Label for="YPBM">药品编码</Label>
		             <TextBox inputId="YPBM" name="YPBM" :readonly="true" v-model="user.YPBM"></TextBox>
		          </li>
		          <li>
		            <Label for="YPMC">*药品名称</Label>
		             <TextBox ref="YPMC" inputId="YPMC" name="YPMC" 
                 v-model="user.YPMC" v-Tooltip="getTipOpts('YPMC')"
                 @keyup.enter.native="kdn($event)"></TextBox>
		          </li>
		          <li>
		            <Label for="TYM">*通用名</Label>
		            <TextBox inputId="TYM" name="TYM" ref='TYM' 
                v-model="user.TYM" v-Tooltip="getTipOpts('TYM')" 
                @keyup.enter.native="kdn($event)"
                @keyup.native="kyp($event)"></TextBox>
		          </li>
		          <li>
		            <Label for="HXM">*化学名</Label>
		             <TextBox inputId="HXM" name="HXM" ref="HXM" v-model="user.HXM" v-Tooltip="getTipOpts('HXM')" @keyup.enter.native="kdn($event)"></TextBox>
		          </li>
		          <li>
		            <Label for="PYM">拼音码</Label>
		             <TextBox inputId="PYM" name="PYM" v-model="user.PYM" v-py.upperfirst="user.TYM" @keyup.enter.native="kdn($event)"></TextBox>
		          </li>
		          <li>
		            <Label for="WBM">五笔码</Label>
		             <TextBox inputId="WBM" name="WBM" v-model="user.WBM" @keyup.enter.native="kdn($event)"></TextBox>
		          </li>
		          <li>
		            <Label for="YPTM">药品条码</Label>
		             <TextBox inputId="YPTM" name="YPTM" v-model="user.YPTM"
                  @keyup.enter.native="kdn($event)"></TextBox>
		          </li>
		          <li>
		            <Label for="CD">*产地</Label>
		             <TextBox inputId="CD" name="CD" ref="CD" v-model="user.CD" v-Tooltip="getTipOpts('CD')" @keyup.enter.native="kdn($event)"></TextBox>
		          </li>
		          <li>
		            <Label for="SCCJ">*生产厂家</Label>
		             <TextBox inputId="SCCJ" name="SCCJ" ref="SCCJ" v-model="user.SCCJ" v-Tooltip="getTipOpts('SCCJ')" @keyup.enter.native="kdn($event)"></TextBox>
		          </li>
		          <li>
		            <Label for="PZWH">批准文号</Label>
		             <TextBox inputId="PZWH" name="PZWH" v-model="user.PZWH" @keyup.enter.native="kdn($event)"></TextBox>
		          </li>
		          <li>
		            <Label for="YBBM">医保编码</Label>
		             <TextBox inputId="YBBM" name="YBBM" :readonly="true" v-model="user.YBBM" @keyup.enter.native="kdn($event)"></TextBox>
		          </li>
		          <li>
		            <Label for="YBMC">医保名称</Label>
		             <TextBox inputId="YBMC" name="YBMC" :readonly="true" v-model="user.YBMC" @keyup.enter.native="kdn($event)"></TextBox>
		          </li>
		          <li>
		            <Label for="CGPFJ">*常规批发价</Label>
                  <NumberBox inputId="CGPFJ" name="CGPFJ" ref="CGPFJ"  
                    v-model="user.CGPFJ" v-Tooltip="getTipOpts('CGPFJ')"
                    @keyup.enter.native="kdn($event)" :value="0.00"
                    :precision="2" :spinners="false"  
                  ></NumberBox>
		          </li>
		          <li>
		            <Label for="YPJX">*药品剂型</Label>
		             <ComboBox inputId="YPJX" name="YPJX" ref="YPJX" :data="ypjx" v-model="user.YPJX" v-Tooltip="getTipOpts('YPJX')" @keyup.enter.native="kdn($event)"></ComboBox>
		          </li>
		          <li>
		            <Label for="ZJTJL">针剂体积量</Label>
		             <TextBox inputId="ZJTJL" name="ZJTJL" v-model="user.ZJTJL" @keyup.enter.native="kdn($event)"></TextBox>
		          </li>
		          <li>
		            <Label for="YLDL">药理大类</Label>
		             <ComboBox inputId="YLDL" name="YLDL" v-model="user.YLDL" @keyup.enter.native="kdn($event)"></ComboBox>
		          </li>
		          <li>
		            <Label for="CGLXJ">*常规零售价</Label>
		             <NumberBox inputId="CGLXJ" name="CGLXJ" ref="CGLXJ"
                  v-model="user.CGLXJ" v-Tooltip="getTipOpts('CGLXJ')"
                   @keyup.enter.native="kdn($event)" :value="0.00"
                   :precision="2" :spinners="false"
                  ></NumberBox>
		          </li>
		          <li>
		            <Label for="YPGG">药品规格</Label>
		             <TextBox inputId="YPGG" name="YPGG" :readonly="true" v-model="YPGG" @keyup.enter.native="kdn($event)"></TextBox>
		          </li>
		          <li>
		            <Label for="ZJTJDW">针剂体积单位</Label>
		             <ComboBox inputId="ZJTJDW" name="ZJTJDW" :data="zjtjdw" v-model="user.ZJTJDW" @keyup.enter.native="kdn($event)"></ComboBox>
		          </li>
		          <li>
		            <Label for="YLXL">药理小类</Label>
		             <ComboBox inputId="YLXL" name="YLXL" v-model="user.YLXL" @keyup.enter.native="kdn($event)"></ComboBox>
		          </li>
		          <li>
		            <Label for="YPLB">*药品类别</Label>
		             <ComboBox inputId="YPLB" name="YPLB" ref="YPLB" :data="yplb" v-model="user.YPLB" v-Tooltip="getTipOpts('YPLB')" @keyup.enter.native="kdn($event)"></ComboBox>
		          </li>
		          <li>
		            <Label for="JBJL">*基本剂量</Label>
		             <TextBox inputId="JBJL" name="JBJL" ref="JBJL"
                  v-model="user.JBJL" v-Tooltip="getTipOpts('JBJL')"
                  @keyup.enter.native="kdn($event)"></TextBox>
		          </li>
		          <li>
		            <Label for="ZJFGF">针剂分隔符</Label>
		             <TextBox inputId="ZJFGF" name="ZJFGF" v-model="user.ZJFGF" :data="user.ZJFGF" @keyup.enter.native="kdn($event)"></TextBox>
		          </li>
		          <li>
		            <Label for="ZT">状态</Label>
		             <ComboBox inputId="ZT" name="ZT" :data="zt" v-model="user.ZT" @keyup.enter.native="kdn($event)"></ComboBox>
		          </li>
		          <li>
		            <Label for="BXLX">*报销类型</Label>
		             <ComboBox inputId="BXLX" name="BXLX" ref="BXLX" :data="bxlx" v-model="user.BXLX" v-Tooltip="getTipOpts('BXLX')" @keyup.enter.native="kdn($event)"></ComboBox>
		          </li>
		          <li>
		            <Label for="JLDW">*剂量单位</Label>
		             <ComboBox inputId="JLDW" name="JLDW" ref="JLDW" 
                 :data="jldw" v-model="user.JLDW" v-Tooltip="getTipOpts('JLDW')"
                  @keyup.enter.native="kdn($event)"
                  ></ComboBox>
		          </li>
		          <li>
		            <Label for="JMDP">*精麻毒品</Label>
		             <ComboBox inputId="JMDP" name="JMDP" ref="JMDP" :data="jmdp" v-model="user.JMDP" v-Tooltip="getTipOpts('JMDP')" @keyup.enter.native="kdn($event)"></ComboBox>
		          </li>
		          <li>
		            <Label for="MRYL">默认用量</Label>
		             <TextBox inputId="MRYL" name="MRYL" v-model="user.MRYL" @keyup.enter.native="kdn($event)"></TextBox>
		          </li>
		          <li>
		            <Label for="JBBZDW">基本包装单位</Label>
		             <ComboBox inputId="JBBZDW" name="JBBZDW" :data="jbbzdw" v-model="user.JBBZDW" @keyup.enter.native="kdn($event)"></ComboBox>
		          </li>
		          <li>
		            <Label for="JBYP">基本药品</Label>
		             <ComboBox inputId="JBYP" name="JBYP" :data="jbyp" v-model="user.JBYP" @keyup.enter.native="kdn($event)"></ComboBox>
		          </li>
		          <li>
		            <Label for="MRDW">默认单位</Label>
		             <ComboBox inputId="MRDW" name="MRDW" :data="mrdw" v-model="user.MRDW" @keyup.enter.native="kdn($event)"></ComboBox>
		          </li>
		          <li>
		            <Label for="JBGG">基本规格</Label>
		             <TextBox inputId="JBGG" name="JBGG" :readonly="true" 
                 v-model='JBGG'
                 @keyup.enter.native="kdn($event)"></TextBox>
		          </li>
		          <li>
		            <Label for="YPSX">药品属性</Label>
		             <TextBox inputId="YPSX" name="YPSX" v-model="user.YPSX" @keyup.enter.native="kdn($event)"></TextBox>
		          </li>
		          <li>
		            <Label for="MRPC">默认频次</Label>
		             <ComboBox inputId="MRPC" name="MRPC" :data="mrpc" v-model="user.MRPC" @keyup.enter.native="kdn($event)"></ComboBox>
		          </li>
		          <li>
		            <Label for="CGBZL">*常规包装量</Label>
		             <TextBox inputId="CGBZL" name="CGBZL" ref="CGBZL" v-model="user.CGBZL" v-Tooltip="getTipOpts('CGBZL')" @keyup.enter.native="kdn($event)"></TextBox>
		          </li>
		          <li>
		            <Label for="JKYP">进口药品</Label>
		             <ComboBox inputId="JKYP" name="JKYP" :data="jkyp" v-model="user.JKYP" @keyup.enter.native="kdn($event)"></ComboBox>
		          </li>
		          <li>
		            <Label for="MRTJ">默认途径</Label>
		             <ComboBox inputId="MRTJ" name="MRTJ" :data="mrtj" v-model="user.MRTJ" @keyup.enter.native="kdn($event)"></ComboBox>
		          </li>
		          <li>
		            <Label for="CGBZDW">*常规包装单位</Label>
		             <ComboBox inputId="CGBZDW" name="CGBZDW" ref="CGBZDW" :data="cgbzdw" v-model="user.CGBZDW" v-Tooltip="getTipOpts('CGBZDW')" @keyup.enter.native="kdn($event)"></ComboBox>
		          </li>
		          <li>
		            <Label for="DSYHL">大输液化疗</Label>
		             <ComboBox inputId="DSYHL" name="DSYHL" v-model="user.DSYHL" @keyup.enter.native="kdn($event)"></ComboBox>
		          </li>
		           <li>
		            <Label for="BZ">备注</Label>
		             <TextBox inputId="BZ" name="BZ" :multiline="true" v-model="user.BZ" @keyup.enter.native="kdn($event)"></TextBox>
		          </li>
		        </ul>
      	</div>
        <div class="dialog-button">
				<LinkButton style="width:80px" iconCls="icon-ok" @click="submitForm">保存</LinkButton>
				<LinkButton style="width:80px" iconCls="icon-cancel" @click="$refs.d1.close()">取消</LinkButton>
			</div>
       </Form>
    </Dialog>
	</div>
</template>
<script>
require('../../static/vue-py.js');
import {searchWord} from "../../static/vue-wb.js"
export default {
  data() {
    return {
      total: 0,
      value: null,
      pageNumber: 1,
      pageSize: 10,
      selectionMode: "single",
      data: [],
      loading: false,
      pagePosition: "bottom",
      dialogClosed: true,
      row:"",
      title: "",
      selection: null,
      user: {
        YPBM: "",
        YPMC: "",
        TYM: "",
        HXM: "",
        PYM: "",
        WBM: "",
        YPTM: "",
        CD: "",
        SCCJ: "",
        PZWH: "",
        YBBM: "",
        YBMC: "",
        CGPFJ: 0,
        YPJX: "",
        ZJTJL: "",
        YLDL: "",
        CGLXJ: 0,
        YPGG: "",
        ZJTJDW: "",
        YLXL: "",
        YPLB: "",
        JBJL: "",
        ZJFGF: ":",
        ZT: 0,
        BXLX: "",
        JLDW: "",
        JMDP: "",
        MRYL: "",
        JBBZDW: "",
        JBYP: "",
        MRDW: "",
        JBGG: "",
        YPSX: "",
        MRPC: "",
        CGBZL: "",
        JKYP: "",
        MRTJ: "",
        CGBZDW: "",
        DSYHL: "",
        BZ: "",
      },
      rules: {
        YPMC:"required",
        TYM: "required",
        HXM: "required",
        CD: "required",
        SCCJ: "required",
        CGPFJ: "required",
        YPJX: "required",
        CGLXJ: "required",
        YPLB: "required",
        JBJL: "required",
        BXLX: "required",
        JMDP: "required",
        JLDW: "required",
        CGBZL: "required",
        CGBZDW: "required"
      },
      errors: {},
      ypjx: [
        {"value": 10, text: "针剂"},
        {"value": 11, text: "粉剂"},
        {"value": 12, text: "片剂"}
      ],
      zjtjdw: [
        {"value": "ml", text: "ml"},
        {"value": "cc", text: "cc"}
      ],
      yplb: [
        {"value": "西药", text: "西药"},
        {"value": "草药", text: "草药"},
        {"value": "中成药", text: "中成药"}
      ],
      zt:[
        {"value": 0, text: "停用"},
        {"value": 1, text: "启用"}
      ],
      bxlx: [
        {"value": "甲类", text: "甲类"},
        {"value": "乙类", text: "乙类"},
        {"value": "自费", text: "自费"}
      ],
      jldw: [
        {"value": "g", text: "g"},
        {"value": "cc", text: "cc"},
        {"value": "cm", text: "cm"},
        {"value": "cm2", text: "cm2"},
        {"value": "cm3", text: "cm3"},
        {"value": "mg", text: "mg"},
        {"value": "ml", text: "ml"},
        {"value": "包", text: "包"},
        {"value": "盒", text: "盒"},
        {"value": "袋", text: "袋"},
        {"value": "单位", text: "单位"}
      ],
      jmdp: [
        {"value": 11, text: "普通"},
        {"value": 12, text: "精一"},
        {"value": 13, text: "精二"},
        {"value": 14, text: "麻醉"},
        {"value": 15, text: "毒"},
        {"value": 16, text: "酒"}
      ],
      jbbzdw: [
        {"value": "支", text: "支"},
        {"value": "粒", text: "粒"}
      ],
      jbyp: [
        {"value": 20, text: "基药"},
        {"value": 30, text: "非基药"},
        {"value": 40, text: "国基"}
      ],
      mrdw: [
        {"value": "ml", text: "ml"},
        {"value": "支", text: "支"},
        {"value": "盒", text: "盒"},
        {"value": "片", text: "片"}
      ],
      mrpc: [
        {"value": "qd", text: "qd"},
        {"value": "bid", text: "bid"},
        {"value": "tid", text: "tid"},
        {"value": "st", text: "st"},
        {"value": "biw", text: "biw"},
        {"value": "tiw", text: "tiw"}
      ],
      jkyp: [
        {"value": 10, text: "进口"},
        {"value": 11, text: "非进口"}
      ],
      mrtj: [
        {"value": 40, text: "口服"},
        {"value": 50, text: "静滴"},
        {"value": 60, text: "雾化"},
        {"value": 70, text: "静注"}
      ],
      cgbzdw: [
        {"value": "盒", text: "盒"},
        {"value": "粒", text: "粒"}
      ]
    };
  },
  created() {
    let _this = this;
    this.loadPage(this.pageNumber, this.pageSize);
    this.defaultUser = JSON.parse(JSON.stringify(this.user));
    //新增 修改 删除 键盘事件
    document.onkeydown =  function (e) {
      if (e.keyCode == 175) {
        _this.add();
      }
      if (e.keyCode == 177) {
        _this.edit();
      }
      if (e.keyCode == 179) {
        _this.del();
      }
    }
  },
  //计算属性
  computed: {
    JBGG: {  //基本规格
      get () {
        let ypgg = this.user.JBJL + this.user.JLDW;
        let _ypgg = this.user.ZJTJL + this.user.ZJTJDW;
        return ypgg + ":" + _ypgg + "/" + this.user.JBBZDW; 
      },
      set (value) {
        return value;
      }
    },
    YPGG: {  //药品规格
      get () {
        let ypgg1 = this.user.JBJL + this.user.JLDW;
        let _ypgg1 = this.user.ZJTJL + this.user.ZJTJDW;
        return ypgg1 + ":" + _ypgg1 + "*" + this.user.CGBZL + this.user.JBBZDW + '/' +this.user.CGBZDW;
      },
      set (value) {
          return value;
      }
    }
  },
  methods: {
    //搜索
    onSearch(event) {
      this.value = event.value;
    },
    onDialogOpen() {  //新增
      this.$nextTick(() => {
        this.$refs.YPMC.focus();
        this.$refs.user.validate();
      })
    },
    getError(name) {
      return this.errors[name] && this.errors[name].length
        ? this.errors[name][0]
        : "";
    },
    hasError(name) {
      return this.getError(name) != "";
    },
    getTipOpts(name) {
      return {
        content: this.getError(name),
        closed: !this.hasError(name),
        position: "right"
      };
    },
    //新增
    add () {
      this.title = "新增";
      this.$refs.d1.open();
    },
    //表单验证 保存
    submitForm() {
      this.$refs.user.validate(valid => {
        let keys = [];
        if (valid != null) {
          for (let key in valid) {
            keys.push(key);
          }
          this.$message.error('信息填写不完整');
          this.$refs[keys[0]].focus();
          
        } else{
          if (this.title == "新增") {
            let Data = this.data;
            let idx = Data.length;
            this.user.id = idx + 1;
            this.user.JBGG = this.JBGG;
            this.user.YPGG = this.YPGG;
            this.data.push(this.user);
            localStorage.setItem("info", JSON.stringify(this.data));
          } else {
            let dta = JSON.parse(localStorage.getItem('info'));
            let com = JSON.stringify(this.user);
            let editData = JSON.parse(com);
            for (let e = 0; e < dta.length; e++) {
              if (dta[e].id == editData.id) {
                this.$set(dta,e,editData);
              }
            }
            localStorage.setItem("info", JSON.stringify(dta));
          }
          this.$alert("保存成功",{
            confirmButtonText: '确定',
            type: 'success',
            center: true
          }).then(() =>{
              this.$refs.d1.close();
              this.loadPage(this.pageNumber, this.pageSize);
          })
        }
      });
    },
    //分页数据
    onPageChange(event) {
      this.loadPage(event.pageNumber, event.pageSize);
    },
    //清空数据
    close () {
      this.$nextTick(() => {
        this.user =  JSON.parse(JSON.stringify(this.defaultUser));
      })
    },
    /*表格数据*/
    loadPage(pageNumber, pageSize) {
      this.loading = true;
      setTimeout(() => {
        let result = this.getData(pageNumber, pageSize);
        this.total = result.total;
        this.pageNumber = result.pageNumber;
        this.data = result.rows;
        this.loading = false;
      }, 1000);
    },
    //表格分页数据
    getData(pageNumber, pageSize) {
      let data = JSON.parse(localStorage.getItem('info'));
      if(data == null) {
        var total = this.data.length;
        return {
          total: total,
          pageNumber: pageNumber,
          pageSize: pageSize,
          rows: this.data
        };  
      } else {
       var total = data.length;
        for (var i = 0; i < data.length; i++) {
          if (data[i].ZT == 0) {
            data[i].ZT = "停用";
          } else if (data[i].ZT == 1) {
              data[i].ZT = "启用";
          }
        }
        return {
          total: total,
          pageNumber: pageNumber,
          pageSize: pageSize,
          rows: data
        };
      }
    },
    //TYM  转换  WBM
    kyp (e) {
      var _TYM = this.user.TYM;
      this.user.WBM = searchWord(_TYM,0,25);
    },
    //键盘事件
     kdn (e) {
       e.cancelBubble = true;
		  let index = ""
    	let target = e.target;
    	let _ipt = document.querySelectorAll(".f-order3");
    	for (let i = 0; i<_ipt.length; i++) {
    		if (target === _ipt[i]) {
    			index = i + 1;   
    			if (index < _ipt.length) {
    				_ipt[index].focus();
    			} else if (index == _ipt.length) {
            let _pre = document.querySelectorAll(".dialog-button a");
            _pre[0].focus();
    			}
    		}
    	}
    },  
    //修改数据
    edit () {
      if (this.row) {
        this.$refs.d1.open();
        this.title = "修改";
        this.user = this.row;
        
      } else {
        this.$message.error('请选择要修改的数据');
      }
    },
    //删除数据
    del () {
      console.log(this.row);
      if (this.row) {
        this.$confirm('确定要删除？', '提示', {
          confirmButtonText: '确定',  
           cancelButtonText: '取消',        
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          let delData = JSON.parse(localStorage.getItem('info'));
          for (let k = 0; k < delData.length; k++) {
            if (delData[k].id == this.row.id) {
              delData.splice(k,1);
            }
          }
          localStorage.setItem("info", JSON.stringify(delData));
          this.loadPage(this.pageNumber, this.pageSize);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      } else {
       this.$message.error('请选择要删除的数据');
      }
    },
  }
};
</script>
<style>
.datagrid .datagrid-pager {
  border-style:none !important;
}
.button-group {
  padding: 5px 20px;
}
.panel-noscroll .f-full {
  border-left: none;
  border-right: none;
  border-bottom: none;
}
.formList {
  padding: 10px 20px 2px 20px;
  overflow: hidden;
}
.formList li {
  float: left;
  margin-bottom: 8px;
  line-height: 26px;
}
.formList li label {
  width: 100px;
  text-align: right;
  height: 26px;
}
.formList li .f-field {
  height: 26px;
}
.formList li .textbox-readonly input {
  background: #f0f0f0;
}
.formList li:last-child .f-field {
  width: 712px;
  height: 56px;
}
.error {
  color: red;
  font-size: 12px;
  margin: 4px 0;
}
.window-mask {
  z-index: 2000 !important;
}
.el-message-box__wrapper {
  z-index: 999999 !important;
}
</style>