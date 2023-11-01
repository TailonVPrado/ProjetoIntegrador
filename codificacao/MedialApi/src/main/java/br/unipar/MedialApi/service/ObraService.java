package br.unipar.MedialApi.service;

import br.unipar.MedialApi.model.Obra;
import br.unipar.MedialApi.model.dto.ObraCorteDto;
import br.unipar.MedialApi.repository.ObraRepository;
import br.unipar.MedialApi.specification.ObraSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ObraService {
    @Autowired
    private ObraRepository obraRepository;

    public Obra insert(Obra obra) throws Exception{
        validaInsert(obra);
        obra.setNrVersao(1);
        return obraRepository.saveAndFlush(obra);
    }

    public List<Obra> findAll(Long idEmpresa, String dsObra, Date dtLctoIni, Date dtLctoFim, Long limit, boolean retornarObrasJaImpressas){
        Specification<Obra> spec = Specification.where(null);

        if(idEmpresa != null && idEmpresa != 0){
            spec = spec.and(ObraSpecification.pertenceAEmpresa(idEmpresa));
        }
        if(dsObra != null){
            spec = spec.and(ObraSpecification.descricaoContains(dsObra));
        }
        if (dtLctoIni != null) {
            spec = spec.and(ObraSpecification.lancamentoMaiorQue(dtLctoIni));
        }
        if (dtLctoFim != null) {
            spec = spec.and(ObraSpecification.lancamentoMenorQue(dtLctoFim));
        }

        if(!retornarObrasJaImpressas){
            spec = spec.and(ObraSpecification.impressa());
        }

        spec = spec.and(ObraSpecification.ativo());


        Pageable pageable;
        if (limit != null && limit > 0) {
            pageable = PageRequest.of(0, limit.intValue(), Sort.by(Sort.Order.desc("dtLancamento")));
        } else {
            pageable = PageRequest.of(0, Integer.MAX_VALUE, Sort.by(Sort.Order.desc("dtLancamento")));
        }

        Page<Obra> page = obraRepository.findAll(spec, pageable);
        List<Obra> obras = page.getContent();
        return obras;

    }

    public Obra delete(Long id) throws Exception{
        Obra obra = findById(id);

        obra.setStAtivo(false);

        obraRepository.saveAndFlush(obra);
        return obra;
    }

    public Obra update(Obra obra) throws Exception{
        validaUpdate(obra);
        Obra obraAtu = findById(obra.getIdObra());
        //o unico atributo que deve ser atualziado de uma obra é sua descrição
        obraAtu.setDsObra(obra.getDsObra());

        return obraRepository.saveAndFlush(obraAtu);
    }

    public Obra updateVersao(Obra obra) throws Exception{
        validaUpdate(obra);
        Obra obraAtu = findById(obra.getIdObra());
        obraAtu.setNrVersao(obra.getNrVersao());

        return obraRepository.saveAndFlush(obraAtu);
    }

    public Obra findById(Long id) throws Exception{
        Optional<Obra> retorno = obraRepository.findById(id);
        if(retorno.isPresent()){
            return retorno.get();
        }else {
            throw new Exception("Obra com o ID ("+id+") não encontrada");
        }
    }

    private void validaInsert(Obra obra) throws Exception{
        validaDescricao(obra);
        validaDataLancamento(obra);
        validaFks(obra);
    }

    private void validaUpdate(Obra obra) throws Exception{
        validaDescricao(obra);
        if(obra.getIdObra() == null || obra.getIdObra() == 0){
            throw new Exception("Informe o ID para atualizar as informações da obra");
        }
    }

    private void validaDescricao(Obra obra) throws Exception{
        obra.setDsObra(obra.getDsObra().trim().replaceAll("\\s+", " "));
        if(obra.getDsObra().trim().length() < 3){
            throw new Exception("A descrição da obra deve conter ao menos 3 caracteres.");
        }else if(obra.getDsObra().trim().length() >60){
            throw new Exception("A descrição da obra deve conter no máximo 60 caracteres.");
        }
    }

    private void validaDataLancamento(Obra obra) throws Exception{
        if(obra.getDtLancamento().compareTo(new Date()) > 0){
            throw new Exception("A data de lançamento da obra não pode ser superior a data atual.");
        }
    }
    private void validaFks(Obra obra) throws Exception{
        if(obra.getEmpresa() == null || obra.getEmpresa().getIdEmpresa() == 0){
            throw new Exception("Não é possivel inserir uma obra no sistema sem vinculo com uma empresa. Entre em contato com os administradores do sistema.");
        }
    }
}
